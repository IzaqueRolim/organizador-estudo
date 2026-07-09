import { useConcurso } from "../hooks/useConcurso";
import type { Conteudo, ConteudoStatus } from "../types/concurso";

interface ConteudoTreeProps {
  disciplinaId: string;
  conteudos: Conteudo[];
  onAddConteudo: (disciplinaId: string, parentId?: string, parentTitle?: string) => void;
}

const statusLabel: Record<ConteudoStatus, string> = {
  pendente: "Pendente",
  em_estudo: "Em estudo",
  concluido: "Concluido",
};

const proximoStatus: Record<ConteudoStatus, ConteudoStatus> = {
  pendente: "em_estudo",
  em_estudo: "concluido",
  concluido: "pendente",
};

export function ConteudoTree({
  disciplinaId,
  conteudos,
  onAddConteudo,
}: ConteudoTreeProps) {
  if (conteudos.length === 0) {
    return (
      <div className="emptyState compact">
        Nenhum conteudo cadastrado para esta disciplina.
      </div>
    );
  }

  return (
    <ul className="conteudoTree">
      {conteudos.map((conteudo) => (
        <ConteudoItem
          key={conteudo.id}
          disciplinaId={disciplinaId}
          conteudo={conteudo}
          onAddConteudo={onAddConteudo}
        />
      ))}
    </ul>
  );
}

interface ConteudoItemProps {
  disciplinaId: string;
  conteudo: Conteudo;
  onAddConteudo: (disciplinaId: string, parentId?: string, parentTitle?: string) => void;
}

function ConteudoItem({
  disciplinaId,
  conteudo,
  onAddConteudo,
}: ConteudoItemProps) {
  const { updateConteudo, removeConteudo } = useConcurso();

  const editarConteudo = () => {
    const novoTitulo = window.prompt("Novo titulo", conteudo.titulo);

    if (novoTitulo?.trim()) {
      updateConteudo(disciplinaId, conteudo.id, { titulo: novoTitulo });
    }
  };

  const excluirConteudo = () => {
    if (window.confirm(`Remover "${conteudo.titulo}" e seus subtitulos?`)) {
      removeConteudo(disciplinaId, conteudo.id);
    }
  };

  return (
    <li>
      <div className={`conteudoItem ${conteudo.status}`}>
        <button
          type="button"
          className="statusButton"
          onClick={() =>
            updateConteudo(disciplinaId, conteudo.id, {
              status: proximoStatus[conteudo.status],
            })
          }
        >
          {statusLabel[conteudo.status]}
        </button>

        <div className="conteudoText">
          <strong>{conteudo.titulo}</strong>
          {conteudo.observacao && <span>{conteudo.observacao}</span>}
        </div>

        <div className="buttonGroup">
          <button
            type="button"
            className="iconButton"
            title="Adicionar subtopico"
            onClick={() => onAddConteudo(disciplinaId, conteudo.id, conteudo.titulo)}
          >
            +
          </button>
          <button
            type="button"
            className="iconButton"
            title="Editar conteudo"
            onClick={editarConteudo}
          >
            Editar
          </button>
          <button
            type="button"
            className="iconButton danger"
            title="Excluir conteudo"
            onClick={excluirConteudo}
          >
            Excluir
          </button>
        </div>
      </div>

      {conteudo.filhos.length > 0 && (
        <ul className="conteudoTree nested">
          {conteudo.filhos.map((filho) => (
            <ConteudoItem
              key={filho.id}
              disciplinaId={disciplinaId}
              conteudo={filho}
              onAddConteudo={onAddConteudo}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
