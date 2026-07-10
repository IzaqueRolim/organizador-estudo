import type { AppPage } from "../../components/Header";
import { useConcurso } from "../../hooks/useConcurso";
import {
  calcularDiasAteProva,
  formatarData,
  progressoConcurso,
  totalConcluidosConcurso,
  totalConteudosConcurso,
} from "../../utils/concursoStats";

interface DashboardProps {
  onNavigate: (page: AppPage) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const {
    concursos,
    concursoIdAtivo,
    criarConcurso,
    selecionarConcurso,
    removeConcurso,
  } = useConcurso();

  const novoConcurso = () => {
    criarConcurso({ titulo: `Concurso ${concursos.length + 1}` });
    onNavigate("cadastro");
  };

  return (
    <main className="page">
      <section className="pageTitle withAction">
        <div>
          <span>Concursos</span>
          <h1>Visualizador em cards</h1>
          <p>Escolha qual concurso fica ativo para cadastro, edital, pesos e estudos.</p>
        </div>
        <button type="button" className="primaryButton" onClick={novoConcurso}>
          Novo concurso
        </button>
      </section>

      <section className="concursoCardGrid">
        {concursos.map((concurso) => {
          const dias = calcularDiasAteProva(concurso.dataProva);
          const progresso = progressoConcurso(concurso);
          const totalConteudos = totalConteudosConcurso(concurso);
          const concluidos = totalConcluidosConcurso(concurso);
          const ativo = concurso.id === concursoIdAtivo;

          return (
            <article
              key={concurso.id}
              className={ativo ? "concursoCard selected" : "concursoCard"}
            >
              <div className="concursoCardHeader">
                <div>
                  <span>{ativo ? "Selecionado" : "Concurso"}</span>
                  <h2>{concurso.titulo}</h2>
                  <p>
                    {concurso.cargo || "Cargo nao informado"} /{" "}
                    {concurso.banca || "Banca nao informada"}
                  </p>
                </div>
                <strong>{dias === null ? "--" : dias} Dias</strong>
              </div>

              <div className="progressBar" aria-label={`Progresso ${progresso}%`}>
                <span style={{ width: `${progresso}%` }} />
              </div>

              <dl className="cardStats">
                <div>
                  <dt>Prova</dt>
                  <dd>{formatarData(concurso.dataProva)}</dd>
                </div>
                <div>
                  <dt>Disciplinas</dt>
                  <dd>{concurso.disciplinas.length}</dd>
                </div>
                <div>
                  <dt>Conteudos</dt>
                  <dd>
                    {concluidos}/{totalConteudos}
                  </dd>
                </div>
              </dl>

              <div className="formActions">
                <button
                  type="button"
                  className="primaryButton"
                  onClick={() => {
                    selecionarConcurso(concurso.id);
                    onNavigate("informacoes");
                  }}
                >
                  Acessar Concurso
                </button>
                <button
                  type="button"
                  className="ghostButton"
                  onClick={() => {
                    selecionarConcurso(concurso.id);
                    onNavigate("cadastro");
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="ghostButton danger"
                  onClick={() => {
                    if (window.confirm(`Remover "${concurso.titulo}"?`)) {
                      removeConcurso(concurso.id);
                    }
                  }}
                >
                  Excluir
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
