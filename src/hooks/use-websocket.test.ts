import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useWebsocket } from "./use-websocket";
import { useSessionStore } from "@/store/session";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { act } from "react";
import type { GridEvent, StreamGridEventsRequest } from "@contracts/apex20/v1/grid_events_pb";

/* 
 * ============================================================================
 * DECISÃO TÉCNICA: MOCK CUSTOMIZADO DO WEBSOCKET
 * ============================================================================
 * Optamos por utilizar um Stub (Mock) manual e determinístico da classe global
 * WebSocket em vez do padrão de mercado (MSW ou vitest-websocket-mock).
 * 
 * Por quê?
 * 1. React 19 e act(): Bibliotecas prontas geram eventos de rede de forma 
 *    assíncrona que fogem do controle do `act(...)`, causando dezenas de warnings 
 *    de atualização de estado insegura durante os testes.
 * 2. Fake Timers (Exponential Backoff): Para testar a lógica de reconexão
 *    velozmente, usamos `vi.useFakeTimers()`. Bibliotecas em memória entram
 *    em conflito com timers "congelados", resultando em timeouts intermitentes.
 * 3. Determinismo: Este mock nos permite forçar transições (`simulateOpen`) 
 *    exatamente quando o teste exige, garantindo execuções de ~30ms sem "flakiness".
 * ============================================================================
 */

let mockSockets: MockWebSocket[] = [];

class MockWebSocket {
  url: string;
  readyState: number = 0; // CONNECTING
  onopen: (() => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  send = vi.fn();
  close = vi.fn();

  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  constructor(url: string) {
    this.url = url;
    mockSockets.push(this);
  }

  simulateOpen() {
    this.readyState = 1;
    if (this.onopen) this.onopen();
  }

  simulateClose() {
    this.readyState = 3;
    if (this.onclose) this.onclose();
  }

  simulateMessage(data: GridEvent) {
    if (this.onmessage) {
      const event = new MessageEvent("message", {
        data: JSON.stringify(data),
      });
      this.onmessage(event);
    }
  }
}

describe("useWebsocket", () => {
  const wsUrl = "ws://localhost:8080";

  // Cria mocks baseados nos tipos do Protobuf para Type-Safety nos testes
  const mockGridEvent: GridEvent = {
    campaignId: "campaign-1",
    userId: "user-1",
    $typeName: "apex20.v1.GridEvent",
    event: {
      case: "tokenDelete",
      value: "token-123"
    }
  } as unknown as GridEvent;

  const mockStreamRequest: StreamGridEventsRequest = {
    $typeName: "apex20.v1.StreamGridEventsRequest",
    event: mockGridEvent
  } as unknown as StreamGridEventsRequest;

  beforeEach(() => {
    vi.stubGlobal("WebSocket", MockWebSocket);
    
    // Injeta dados de sessão necessários para o Handshake
    useSessionStore.setState({
      campaignId: "test-campaign-123",
      connected: false,
      sceneId: null
    });
    
    // Injeta os dados da Auth
    useAuth.setState({
      token: "mock.jwt.token",
      userId: "test-user-123",
      isAdmin: false,
      isAuthenticated: true
    });

    mockSockets = [];
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should connect automatically and update status", async () => {
    const { result } = renderHook(() => useWebsocket({ url: wsUrl }));

    expect(result.current.status).toBe("connecting");
    expect(mockSockets).toHaveLength(1);

    act(() => {
      mockSockets[0].simulateOpen();
    });

    await waitFor(() => {
      expect(result.current.status).toBe("connected");
      expect(useSessionStore.getState().connected).toBe(true);
    });
  });

  it("should call onMessage when receiving a message", async () => {
    const onMessage = vi.fn();
    renderHook(() => useWebsocket({ url: wsUrl, onMessage }));

    act(() => {
      mockSockets[0].simulateOpen();
    });

    act(() => {
      mockSockets[0].simulateMessage(mockGridEvent);
    });

    await waitFor(() => {
      expect(onMessage).toHaveBeenCalledWith(mockGridEvent);
    });
  });

  it("should send stringified messages to the server based on Protobuf contract", async () => {
    const { result } = renderHook(() => useWebsocket({ url: wsUrl }));

    act(() => {
      mockSockets[0].simulateOpen();
    });

    act(() => {
      result.current.sendMessage(mockStreamRequest);
    });

    expect(mockSockets[0].send).toHaveBeenCalledWith(JSON.stringify(mockStreamRequest));
  });

  it("should transition to idle and close connection on disconnect", async () => {
    const { result } = renderHook(() => useWebsocket({ url: wsUrl }));

    act(() => {
      mockSockets[0].simulateOpen();
    });

    act(() => {
      result.current.disconnect();
    });

    await waitFor(() => {
      expect(result.current.status).toBe("idle");
      expect(useSessionStore.getState().connected).toBe(false);
    });
    
    expect(mockSockets[0].close).toHaveBeenCalled();
  });

  it("should attempt reconnection on unexpected failure using exponential backoff", async () => {
    vi.useFakeTimers();
    
    const { result } = renderHook(() => useWebsocket({ url: wsUrl }));

    expect(mockSockets).toHaveLength(1);
    act(() => {
      mockSockets[0].simulateOpen();
    });
    
    expect(result.current.status).toBe("connected");

    act(() => {
      mockSockets[0].simulateClose();
    });

    expect(result.current.status).toBe("reconnecting");
    expect(useSessionStore.getState().connected).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockSockets).toHaveLength(2);

    act(() => {
      mockSockets[1].simulateOpen();
    });

    expect(result.current.status).toBe("connected");
    expect(useSessionStore.getState().connected).toBe(true);

    vi.useRealTimers();
  });
});
