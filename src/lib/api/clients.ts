import { createClient } from "@connectrpc/connect";
import { HealthService } from "@contracts/proto/apex20/v1/health_pb";
import { ChatService } from "@contracts/proto/apex20/v1/chat_pb";
import { SessionService } from "@contracts/proto/apex20/v1/handshake_pb";
import { createTransport } from "./transport";
import type { Transport } from "@connectrpc/connect";

/**
 * Cria um cliente tipado para o HealthService.
 * Usado para verificar a disponibilidade do backend.
 */
export function createHealthClient(transport?: Transport) {
  return createClient(HealthService, transport ?? createTransport());
}

/**
 * Cria um cliente tipado para o ChatService.
 * Usado para enviar mensagens e rolagens de dados via ConnectRPC.
 */
export function createChatClient(transport?: Transport) {
  return createClient(ChatService, transport ?? createTransport());
}

/**
 * Cria um cliente tipado para o SessionService.
 * Usado para o Handshake inicial de autenticação antes de conectar ao WS.
 */
export function createSessionClient(transport?: Transport) {
  return createClient(SessionService, transport ?? createTransport());
}
