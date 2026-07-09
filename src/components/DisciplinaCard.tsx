import type { ReactNode } from "react";
import { useState } from "react";
import { useConcurso } from "../hooks/useConcurso";
import type { Disciplina } from "../types/concurso";

interface DisciplinaCardProps {
  disciplina: Disciplina;
  children?: ReactNode;
  onAddConteudo?: (disciplinaId: string) => void;
}

const contarConteudos = (disciplinas: Disciplina["conteudos"]): number =>
  disciplinas.reduce(
    (total, conteudo) => total + 1 + contarConteudos(conteudo.filhos),
    0,
  );

const contarConcluidos = (disciplinas: Disciplina["conteudos"]): number =>
  disciplinas.reduce(
    (total, conteudo) =>
      total +
      (conteudo.status === "concluido" ? 1 : 0) +
      contarConcluidos(conteudo.filhos),
    0,
  );

export function DisciplinaCard({
  disciplina,
  children,
  onAddConteudo,
}: DisciplinaCardProps) {
  const { updateDisciplina, removeDisciplina } = useConcurso();
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(disciplina.nome);

  const totalConteudos = contarConteudos(disciplina.conteudos);
  const concluidos = contarConcluidos(disciplina.conteudos);
  const progresso =
    totalConteudos > 0 ? Math.round((concluidos / totalConteudos) * 100) : 0;

  const salvarNome = () => {
    updateDisciplina(disciplina.id, { nome });
    setEditando(false);
  };

  const excluirDisciplina = () => {
    if (window.confirm(`Remover a disciplina "${disciplina.nome}"?`)) {
      removeDisciplina(disciplina.id);
    }
  };

  return (
    <section
      className="disciplinaCard"
      style={{ borderTopColor: disciplina.cor }}
    >
      <div className="disciplinaHeader">
        <div>
          {editando ? (
            <input
              autoFocus
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              onBlur={salvarNome}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  salvarNome();
                }
              }}
            />
          ) : (
            <h3>{disciplina.nome}</h3>
          )}
          <p>
            Peso {disciplina.peso} · {concluidos}/{totalConteudos} concluidos
          </p>
        </div>

        <div className="buttonGroup">
          {onAddConteudo && (
            <button
              type="button"
              className="ghostButton"
              onClick={() => onAddConteudo(disciplina.id)}
            >
              Conteudo
            </button>
          )}
          <button
            type="button"
            className="ghostButton"
            onClick={() => setEditando(true)}
          >
            Editar
          </button>
          <button
            type="button"
            className="ghostButton danger"
            onClick={excluirDisciplina}
          >
            Excluir
          </button>
        </div>
      </div>

      <div className="progressBar" aria-label={`Progresso ${progresso}%`}>
        <span style={{ width: `${progresso}%` }} />
      </div>

      {children}
    </section>
  );
}
