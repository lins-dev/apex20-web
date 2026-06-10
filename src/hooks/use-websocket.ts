import { useEffect, useRef, useState, useCallback } from "react";
import { useSessionStore } from "@/store/session";
import type { GridEvent, StreamGridEventsRequest } from "@contracts/apex20/v1/grid_events_pb";

type WSStatus = "idle" | "connecting" | "connected" | "reconnecting" | "error";

interface UseWebsocketOptions {
  url: string;
  onMessage?: (data: GridEvent) => void;
  autoConnect?: boolean;
}

/**
 * Hook para gerenciar conexão WebSocket com reconexão automática e backoff exponencial.
 * Sincroniza o status de conexão com o store global da sessão.
 * 
 * Utiliza tipagem rígida baseada nos contratos Protobuf (Opção 3 Pura - ADR-007).
 */
export function useWebsocket({ url, onMessage, autoConnect = true }: UseWebsocketOptions) {
  const [status, setStatus] = useState<WSStatus>("idle");
  const [error, setError] = useState<Error | null>(null);
  
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const setConnected = useSessionStore((state) => state.setConnected);

  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    setStatus(() => (reconnectAttemptsRef.current > 0 ? "reconnecting" : "connecting"));
    
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus("connected");
      setConnected(true);
      setError(null);
      reconnectAttemptsRef.current = 0;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    socket.onmessage = (event) => {
      if (onMessageRef.current) {
        try {
          const data = JSON.parse(event.data) as GridEvent;
          onMessageRef.current(data);
        } catch {
          // TODO: Integrar com a biblioteca de Observabilidade (Sentry/PostHog - ADR-024)
          // Em produção, mensagens malformadas que quebram o contrato devem ser logadas
          // para investigarmos incompatibilidades entre backend e frontend.
          console.warn("Invalid message payload received that does not match GridEvent contract.");
        }
      }
    };

    socket.onerror = () => {
      setStatus("error");
      setError(new Error("WebSocket connection error"));
    };

    socket.onclose = () => {
      setConnected(false);
      setStatus((currentStatus) => {
        if (currentStatus !== "idle") {
          scheduleReconnect();
          return "reconnecting";
        }
        return "idle";
      });
    };
  }, [url, setConnected]);

  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) return;

    const backoffMs = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
    reconnectAttemptsRef.current += 1;

    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectTimeoutRef.current = null;
      connect();
    }, backoffMs);
  }, [connect]);

  const disconnect = useCallback(() => {
    setStatus("idle");
    setConnected(false);
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  }, [setConnected]);

  const sendMessage = useCallback((data: StreamGridEventsRequest) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    status,
    error,
    sendMessage,
    connect,
    disconnect,
  };
}
