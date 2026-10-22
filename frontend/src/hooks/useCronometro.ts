import { useCallback, useEffect, useState } from "react";

interface Estado {
  acumuladoMs: number;
  inicioMs: number | null;
  iniciadoEm: string | null;
}

const vazio: Estado = { acumuladoMs: 0, inicioMs: null, iniciadoEm: null };

const ler = (chave: string): Estado => {
  try {
    const bruto = window.localStorage.getItem(chave);
    if (bruto) return { ...vazio, ...JSON.parse(bruto) };
  } catch {
    /* sem armazenamento: começa do zero */
  }
  return vazio;
};

/**
 * Cronômetro que sobrevive a recarregar a página: guarda o instante de início
 * no navegador e recalcula o tempo a partir do relógio, não de "ticks".
 */
export function useCronometro(chave: string) {
  const [estado, setEstado] = useState<Estado>(() => ler(chave));
  const [agora, setAgora] = useState(() => Date.now());

  // a chave não muda durante a vida do componente (a tela é remontada por concurso)
  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(estado));
    } catch {
      /* ignora */
    }
  }, [estado, chave]);

  useEffect(() => {
    if (estado.inicioMs === null) return;
    const t = window.setInterval(() => setAgora(Date.now()), 500);
    return () => window.clearInterval(t);
  }, [estado.inicioMs]);

  const segundos = Math.floor((estado.acumuladoMs + (estado.inicioMs ? Math.max(0, agora - estado.inicioMs) : 0)) / 1000);

  const iniciar = useCallback(() => {
    setAgora(Date.now());
    setEstado((e) => (e.inicioMs ? e : { ...e, inicioMs: Date.now(), iniciadoEm: e.iniciadoEm ?? new Date().toISOString() }));
  }, []);
  const pausar = useCallback(() => {
    setEstado((e) => (e.inicioMs ? { ...e, acumuladoMs: e.acumuladoMs + (Date.now() - e.inicioMs), inicioMs: null } : e));
  }, []);
  const zerar = useCallback(() => setEstado(vazio), []);

  return { segundos, rodando: estado.inicioMs !== null, iniciadoEm: estado.iniciadoEm, iniciar, pausar, zerar };
}
