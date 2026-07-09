import { useState, type FormEvent } from "react";
import { useConcurso } from "../hooks/useConcurso";
import type { ConteudoStatus } from "../types/concurso";

interface NovoConteudoModalProps {
  open: boolean;
  disciplinaId: string;
  parentId?: string;
  parentTitle?: string;
  onClose: () => void;
}

export function NovoConteudoModal({
  open,
  disciplinaId,
  parentId,
  parentTitle,
  onClose,
}: NovoConteudoModalProps) {
  const { addConteudo } = useConcurso();
  const [titulo, setTitulo] = useState("");
  const [observacao, setObservacao] = useState("");
  const [status, setStatus] = useState<ConteudoStatus>("pendente");

  if (!open) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addConteudo(disciplinaId, { titulo, observacao, status }, parentId);
    setTitulo("");
    setObservacao("");
    setStatus("pendente");
    onClose();
  };

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <form className="modalPanel" onSubmit={handleSubmit}>
        <div className="modalHeader">
          <div>
            <h2>Novo conteudo</h2>
            <p>
              {parentTitle
                ? `Sera adicionado dentro de "${parentTitle}".`
                : "Sera adicionado no nivel principal da disciplina."}
            </p>
          </div>
          <button type="button" className="iconButton" onClick={onClose}>
            Fechar
          </button>
        </div>

        <label>
          Titulo
          <input
            required
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            placeholder="Ex.: Principios fundamentais"
          />
        </label>

        <label>
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as ConteudoStatus)}
          >
            <option value="pendente">Pendente</option>
            <option value="em_estudo">Em estudo</option>
            <option value="concluido">Concluido</option>
          </select>
        </label>

        <label>
          Observacao
          <textarea
            rows={3}
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
            placeholder="Artigos, topicos do edital ou estrategia de estudo"
          />
        </label>

        <div className="formActions">
          <button type="submit" className="primaryButton">
            Criar conteudo
          </button>
          <button type="button" className="ghostButton" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
