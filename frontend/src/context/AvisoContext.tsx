import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface Aviso {
  id: number;
  tipo: "ok" | "erro";
  texto: string;
}

interface AvisoValue {
  ok: (texto: string) => void;
  erro: (texto: string) => void;
}

const AvisoContext = createContext<AvisoValue | null>(null);
let contador = 0;

export function AvisoProvider({ children }: { children: ReactNode }) {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  const mostrar = useCallback((tipo: Aviso["tipo"], texto: string) => {
    const id = ++contador;
    setAvisos((atual) => [...atual, { id, tipo, texto }]);
    window.setTimeout(() => setAvisos((atual) => atual.filter((a) => a.id !== id)), tipo === "erro" ? 7000 : 3500);
  }, []);

  const value = useMemo<AvisoValue>(
    () => ({ ok: (t) => mostrar("ok", t), erro: (t) => mostrar("erro", t) }),
    [mostrar],
  );

  return (
    <AvisoContext.Provider value={value}>
      {children}
      <div className="avisos" role="status" aria-live="polite">
        {avisos.map((a) => (
          <div key={a.id} className={`aviso ${a.tipo}`}>
            {a.texto}
          </div>
        ))}
      </div>
    </AvisoContext.Provider>
  );
}

export function useAviso() {
  const ctx = useContext(AvisoContext);
  if (!ctx) throw new Error("useAviso deve ser usado dentro de AvisoProvider");
  return ctx;
}
