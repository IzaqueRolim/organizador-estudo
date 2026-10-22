import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { aoSessaoExpirar, api, ErroApi, lerToken, salvarToken } from "../lib/api";

export interface Usuario {
  id: string;
  email: string;
}

interface AuthValue {
  user: Usuario | null;
  carregando: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  criarConta: (email: string, senha: string) => Promise<void>;
  sair: () => void;
}

interface RespostaAuth {
  token: string;
  usuario: Usuario;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(() => lerToken() !== null);

  const sair = useCallback(() => {
    salvarToken(null);
    setUser(null);
  }, []);

  // restaura a sessão salva
  useEffect(() => {
    if (!lerToken()) return;
    let ativo = true;
    api<Usuario>("GET", "/auth/me")
      .then((u) => ativo && setUser(u))
      .catch((e) => {
        // token inválido/expirado → descarta; erro de rede → também cai na tela de login
        if (!(e instanceof ErroApi) || e.status === 401) salvarToken(null);
      })
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    aoSessaoExpirar(sair);
    return () => aoSessaoExpirar(null);
  }, [sair]);

  const value = useMemo<AuthValue>(() => {
    const iniciar = async (caminho: string, email: string, senha: string) => {
      try {
        const r = await api<RespostaAuth>("POST", caminho, { email, senha });
        salvarToken(r.token);
        setUser(r.usuario);
      } catch (e) {
        throw new Error(e instanceof Error ? traduzir(e.message) : "Não foi possível continuar.", { cause: e });
      }
    };
    return {
      user,
      carregando,
      entrar: (email, senha) => iniciar("/auth/login", email, senha),
      criarConta: (email, senha) => iniciar("/auth/register", email, senha),
      sair,
    };
  }, [user, carregando, sair]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}

function traduzir(mensagem: string) {
  const m = mensagem.toLowerCase();
  if (m.includes("incorret") || m.includes("invalid")) return "E-mail ou senha incorretos.";
  return mensagem;
}
