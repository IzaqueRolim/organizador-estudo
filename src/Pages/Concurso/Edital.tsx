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
