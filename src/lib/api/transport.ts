import { createConnectTransport } from "@connectrpc/connect-web";

/**
 * Transport padrão para comunicação com o apex20-backend via ConnectRPC.
 * Utiliza HTTP/1.1 (Connect Protocol) compatível com qualquer proxy reverso.
 *
 * A URL base é configurada via variável de ambiente VITE_API_URL.
 * Em desenvolvimento local, aponta para o proxy /connect ou valor do env.
 */
export function createTransport(baseUrl?: string) {
  return createConnectTransport({
    baseUrl: baseUrl ?? (import.meta.env.VITE_API_URL as string) ?? "/connect",
  });
}
