/** Cliente HTTP da API (backend NestJS). O token JWT fica no localStorage. */

export const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? "").replace(/\/+$/, "");
export const apiConfigurada = API_URL.length > 0;

const CHAVE_TOKEN = "caderno-concursos:token";

export const lerToken = (): string | null => {
  try {
    return localStorage.getItem(CHAVE_TOKEN);
  } catch {
    return null;
  }
};
export const salvarToken = (token: string | null) => {
  try {
    if (token) localStorage.setItem(CHAVE_TOKEN, token);
    else localStorage.removeItem(CHAVE_TOKEN);
  } catch {
    /* navegador bloqueou o armazenamento: o login vale só até recarregar */
  }
};

/** Chamado quando a API responde 401 com um token salvo (sessão expirada). */
let aoExpirar: (() => void) | null = null;
export const aoSessaoExpirar = (fn: (() => void) | null) => {
  aoExpirar = fn;
};

export class ErroApi extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function mensagemDe(corpo: unknown, status: number): string {
  const m = (corpo as { message?: string | string[] } | null)?.message;
  if (Array.isArray(m)) return m.join(" ");
  if (typeof m === "string" && m) return m;
  if (status === 429) return "Muitas tentativas. Aguarde um minuto e tente de novo.";
  if (status >= 500) return "O servidor teve um problema. Tente novamente em instantes.";
  return `Erro ${status}`;
}

export async function api<T = unknown>(
  metodo: "GET" | "POST" | "PATCH" | "DELETE",
  caminho: string,
  corpo?: unknown,
): Promise<T> {
  const token = lerToken();
  let resposta: Response;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method: metodo,
      headers: {
        ...(corpo !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
    });
  } catch {
    throw new ErroApi("Não consegui falar com o servidor. Verifique sua conexão.", 0);
  }

  let json: unknown = null;
  try {
    json = await resposta.json();
  } catch {
    /* resposta sem corpo */
  }

  if (!resposta.ok) {
    if (resposta.status === 401 && token) aoExpirar?.();
    throw new ErroApi(mensagemDe(json, resposta.status), resposta.status);
  }
  return json as T;
}
