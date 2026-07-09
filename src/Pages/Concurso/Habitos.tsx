import { useMemo } from "react";
import { useConcurso } from "../../hooks/useConcurso";
import { dataLocalIso, formatarMinutos } from "../../utils/concursoStats";

const DIAS_MAPA = 35;

const intensidadeClasse = (minutos: number) => {
  if (minutos >= 120) {
    return "level4";
  }

  if (minutos >= 60) {
    return "level3";
  }

  if (minutos >= 25) {
    return "level2";
  }

  if (minutos > 0) {
    return "level1";
  }

  return "level0";
};

export function Habitos() {
  const { concurso, registrosEstudo } = useConcurso();
  const dias = useMemo(
    () =>
      Array.from({ length: DIAS_MAPA }, (_, index) => {
        const offset = index - (DIAS_MAPA - 1);
        const data = dataLocalIso(offset);
        const minutos = registrosEstudo
          .filter((registro) => registro.data === data)
          .reduce((total, registro) => total + registro.minutos, 0);

        return { data, minutos };
      }),
    [registrosEstudo],
  );

  const totalMinutos = registrosEstudo.reduce(
    (total, registro) => total + registro.minutos,
    0,
  );
  const diasEstudados = dias.filter((dia) => dia.minutos > 0).length;
  const melhorDia = dias.reduce(
    (melhor, dia) => (dia.minutos > melhor.minutos ? dia : melhor),
    dias[0],
  );

  return (
    <main className="page">
      <section className="pageTitle">
        <div>
          <span>Habitos</span>
          <h1>Mapa de frequencia</h1>
          <p>{concurso.titulo}</p>
        </div>
      </section>

      <section className="metricGrid">
        <article className="metricCard">
          <span>Total estudado</span>
          <strong>{formatarMinutos(totalMinutos)}</strong>
        </article>
        <article className="metricCard">
          <span>Dias ativos</span>
          <strong>{diasEstudados}</strong>
        </article>
        <article className="metricCard">
          <span>Melhor dia</span>
          <strong>{formatarMinutos(melhorDia?.minutos ?? 0)}</strong>
        </article>
        <article className="metricCard">
          <span>Sessoes</span>
          <strong>{registrosEstudo.length}</strong>
        </article>
      </section>

      <section className="habitPanel">
        <div className="habitMap" aria-label="Mapa de habitos">
          {dias.map((dia) => (
            <div key={dia.data} className="habitCellWrap">
              <span
                className={`habitCell ${intensidadeClasse(dia.minutos)}`}
                title={`${dia.data}: ${formatarMinutos(dia.minutos)}`}
              />
              <small>{dia.data.slice(8, 10)}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>Historico recente</h2>
          <span>{registrosEstudo.length} registros</span>
        </div>

        {registrosEstudo.length === 0 ? (
          <div className="emptyState compact">Nenhum estudo registrado.</div>
        ) : (
          <div className="historyList">
            {[...registrosEstudo]
              .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm))
              .slice(0, 8)
              .map((registro) => (
                <div key={registro.id} className="historyItem">
                  <strong>{registro.data}</strong>
                  <span>{formatarMinutos(registro.minutos)}</span>
                  {registro.anotacao && <p>{registro.anotacao}</p>}
                </div>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}
