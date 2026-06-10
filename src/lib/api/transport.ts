import { createConnectTransport } from "@connectrpc/connect-web";
import type { Interceptor } from "@connectrpc/connect";
import { getToken } from "@/modules/auth/hooks/use-auth";

/**
 * Interceptor para injetar o JWT no header Authorization em todas as chamadas RPC.
 */
const authInterceptor: Interceptor = (next) => async (req) => {
  const token = getToken();
  if (token) {
    req.header.set("Authorization", `Bearer ${token}`);
  }
  return next(req);
};

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
    interceptors: [authInterceptor],
  });
}
