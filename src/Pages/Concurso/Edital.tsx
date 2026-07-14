import { useState } from "react";
import { ConteudoTree } from "../../components/ConteudoTree";
import { DisciplinaCard } from "../../components/DisciplinaCard";
import { ImportarDisciplinasModal } from "../../components/ImportarDisciplinasModal";
import { NovaDisciplinaModal } from "../../components/NovaDisciplinaModal";
import { NovoConteudoModal } from "../../components/NovoConteudoModal";
import { useConcurso } from "../../hooks/useConcurso";

interface ConteudoTarget {
  disciplinaId: string;
  parentId?: string;
  parentTitle?: string;
}

export function Edital() {
  const { concurso } = useConcurso();
  const [disciplinaModalAberto, setDisciplinaModalAberto] = useState(false);
  const [importarModalAberto, setImportarModalAberto] = useState(false);
  const [conteudoTarget, setConteudoTarget] = useState<ConteudoTarget | null>(
    null,
  );
  const [disciplinasExpandidas, setDisciplinasExpandidas] = useState<Set<string>>(
    new Set(concurso.disciplinas.map((d) => d.id)),
  );

  const toggleExpandirDisciplina = (disciplinaId: string) => {
    setDisciplinasExpandidas((prev) => {
      const novo = new Set(prev);
      if (novo.has(disciplinaId)) {
        novo.delete(disciplinaId);
      } else {
        novo.add(disciplinaId);
      }
      return novo;
    });
  };

  const abrirModalConteudo = (
    disciplinaId: string,
    parentId?: string,
    parentTitle?: string,
  ) => {
    setConteudoTarget({ disciplinaId, parentId, parentTitle });
  };

  return (
    <main className="page">
      <section className="pageTitle withAction">
        <div>
          <span>Edital</span>
          <h1>Disciplinas e conteudos</h1>
          <p>Quebre o edital em topicos estudaveis e acompanhe o andamento.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            className="primaryButton"
            onClick={() => setImportarModalAberto(true)}
          >
            Importar disciplina
          </button>
          <button
            type="button"
            className="ghostButton"
            onClick={() => setDisciplinaModalAberto(true)}
          >
            Nova disciplina
          </button>
        </div>
      </section>

      {concurso.disciplinas.length > 0 && (
        <section style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
          <button
            type="button"
            className="ghostButton"
            onClick={() =>
              setDisciplinasExpandidas(
                new Set(concurso.disciplinas.map((d) => d.id)),
              )
            }
          >
            Expandir tudo
          </button>
          <button
            type="button"
            className="ghostButton"
            onClick={() => setDisciplinasExpandidas(new Set())}
          >
            Minimizar tudo
          </button>
        </section>
      )}

      {concurso.disciplinas.length === 0 ? (
        <section className="emptyState">
          <h2>Nenhuma disciplina cadastrada</h2>
          <p>Comece adicionando as materias cobradas no edital.</p>
          <button
            type="button"
            className="primaryButton"
            onClick={() => setDisciplinaModalAberto(true)}
          >
            Adicionar primeira disciplina
          </button>
        </section>
      ) : (
        <section className="disciplinaGrid">
          {concurso.disciplinas.map((disciplina) => (
            <DisciplinaCard
              key={disciplina.id}
              disciplina={disciplina}
              onAddConteudo={abrirModalConteudo}
              expanded={disciplinasExpandidas.has(disciplina.id)}
              onToggleExpanded={toggleExpandirDisciplina}
            >
              <ConteudoTree
                disciplinaId={disciplina.id}
                conteudos={disciplina.conteudos}
                onAddConteudo={abrirModalConteudo}
              />
            </DisciplinaCard>
          ))}
        </section>
      )}

      <NovaDisciplinaModal
        open={disciplinaModalAberto}
        onClose={() => setDisciplinaModalAberto(false)}
      />

      <ImportarDisciplinasModal
        open={importarModalAberto}
        onClose={() => setImportarModalAberto(false)}
      />

      {conteudoTarget && (
        <NovoConteudoModal
          open={Boolean(conteudoTarget)}
          disciplinaId={conteudoTarget.disciplinaId}
          parentId={conteudoTarget.parentId}
          parentTitle={conteudoTarget.parentTitle}
          onClose={() => setConteudoTarget(null)}
        />
      )}
    </main>
  );
}
