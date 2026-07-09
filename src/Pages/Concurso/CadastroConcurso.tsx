import { ConcursoForm } from "../../components/ConcursoForm";
import { useConcurso } from "../../hooks/useConcurso";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export function CadastroConcurso() {
  const { concurso } = useConcurso();

  return (
    <main className="page">
      <section className="pageTitle">
        <div>
          <span>Cadastro</span>
          <h1>Dados do concurso</h1>
          <p>Centralize as informacoes principais antes de detalhar o edital.</p>
        </div>
      </section>

      <section className="contentLayout">
        <ConcursoForm />

        <aside className="summaryPanel">
          <h2>Resumo</h2>
          <dl>
            <div>
              <dt>Concurso</dt>
              <dd>{concurso.titulo || "Nao informado"}</dd>
            </div>
            <div>
              <dt>Cargo</dt>
              <dd>{concurso.cargo || "Nao informado"}</dd>
            </div>
            <div>
              <dt>Banca</dt>
              <dd>{concurso.banca || "Nao informada"}</dd>
            </div>
            <div>
              <dt>Salario</dt>
              <dd>{formatCurrency(concurso.salario)}</dd>
            </div>
          </dl>

          {concurso.urlEdital && (
            <a
              href={concurso.urlEdital}
              target="_blank"
              rel="noreferrer"
              className="primaryButton fullWidth"
            >
              Abrir edital
            </a>
          )}
        </aside>
      </section>
    </main>
  );
}
