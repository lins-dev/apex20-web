import { createConnectTransport } from "@connectrpc/connect-web";

/**
 * Transport padrão para comunicação com o apex20-backend via ConnectRPC.
 * Utiliza HTTP/1.1 (Connect Protocol) compatível com qualquer proxy reverso.
 *
 * A URL base é configurada via variável de ambiente NEXT_PUBLIC_API_URL.
 * Em desenvolvimento local, aponta para http://localhost:8080.
 */
export function createTransport(baseUrl?: string) {
  return createConnectTransport({
    baseUrl: baseUrl ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
  });
}
