import { useCallback, useEffect, useState } from "react";

type Tema = "claro" | "escuro";
const CHAVE = "tema-caderno";

const lerInicial = (): Tema => {
  try {
    const salvo = window.localStorage.getItem(CHAVE);
    if (salvo === "claro" || salvo === "escuro") return salvo;
  } catch {
    /* sem acesso ao armazenamento: segue o sistema */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
};

export function useTema() {
  const [tema, setTema] = useState<Tema>(lerInicial);

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
  }, [tema]);

  const alternar = useCallback(() => {
    setTema((atual) => {
      const novo = atual === "claro" ? "escuro" : "claro";
      try {
        window.localStorage.setItem(CHAVE, novo);
      } catch {
        /* ignora */
      }
      return novo;
    });
  }, []);

  return { tema, alternar };
}
