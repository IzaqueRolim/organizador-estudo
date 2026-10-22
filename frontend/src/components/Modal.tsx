import { useEffect, useId, useRef, type ReactNode } from "react";
import { IcoFechar } from "./Icones";

interface ModalProps {
  titulo: string;
  descricao?: string;
  onFechar: () => void;
  larga?: boolean;
  children: ReactNode;
  rodape?: ReactNode;
  onEnviar?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Modal({ titulo, descricao, onFechar, larga, children, rodape, onEnviar }: ModalProps) {
  const id = useId();
  const painel = useRef<HTMLElement>(null);

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null;
    const primeiro = painel.current?.querySelector<HTMLElement>("input, select, textarea, button.principal");
    primeiro?.focus();
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      anterior?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const conteudo = (
    <>
      <header>
        <div>
          <h2 id={id}>{titulo}</h2>
          {descricao && <p>{descricao}</p>}
        </div>
        <button type="button" className="btn fantasma icone" onClick={onFechar} aria-label="Fechar">
          <span style={{ width: 16, height: 16, display: "inline-flex" }}>
            <IcoFechar />
          </span>
        </button>
      </header>
      {children}
      {rodape && <footer>{rodape}</footer>}
    </>
  );

  return (
    <div className="modal-fundo" onMouseDown={(e) => e.target === e.currentTarget && onFechar()}>
      {onEnviar ? (
        <form
          ref={painel as React.RefObject<HTMLFormElement | null>}
          className={`modal${larga ? " larga" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={id}
          onSubmit={onEnviar}
        >
          {conteudo}
        </form>
      ) : (
        <div ref={painel as React.RefObject<HTMLDivElement | null>} className={`modal${larga ? " larga" : ""}`} role="dialog" aria-modal="true" aria-labelledby={id}>
          {conteudo}
        </div>
      )}
    </div>
  );
}
