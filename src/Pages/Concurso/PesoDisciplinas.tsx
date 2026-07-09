import { PesoSlider } from "../../components/PesoSlider";
import { useConcurso } from "../../hooks/useConcurso";

export function PesoDisciplinas() {
  const { concurso } = useConcurso();
  const totalPeso = concurso.disciplinas.reduce(
    (total, disciplina) => total + disciplina.peso,
    0,
  );

  return (
    <main className="page">
      <section className="pageTitle">
        <div>
          <span>Pesos</span>
          <h1>Prioridade por disciplina</h1>
          <p>Ajuste o peso para orientar revisoes e blocos de estudo.</p>
        </div>
      </section>

      {concurso.disciplinas.length === 0 ? (
        <section className="emptyState">
          <h2>Cadastre disciplinas primeiro</h2>
          <p>Os pesos aparecem aqui depois que o edital for dividido.</p>
        </section>
      ) : (
        <section className="weightPanel">
          <div className="weightHeader">
            <div>
              <strong>Peso total</strong>
              <span>{totalPeso.toFixed(1)}</span>
            </div>
            <p>
              Quanto maior o peso, maior a participacao da disciplina no plano.
            </p>
          </div>

          <div className="sliderList">
            {concurso.disciplinas.map((disciplina) => (
              <PesoSlider
                key={disciplina.id}
                disciplina={disciplina}
                totalPeso={totalPeso}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
