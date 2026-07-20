import { useMemo, useState, type FormEvent } from "react";
import { useConcurso } from "../../hooks/useConcurso";
import type { NovoCronogramaItem } from "../../types/concurso";
import {
  dataLocalIso,
  encontrarConteudo,
  encontrarDisciplina,
  formatarData,
  formatarMinutos,
  listarConteudos,
  ordenarCronogramaPorDataHora,
} from "../../utils/concursoStats";

const estadoInicial: NovoCronogramaItem = {
  data: dataLocalIso(),
  horario: "19:00",
  duracaoMinutos: 60,
  disciplinaId: "",
  conteudoId: "",
  titulo: "",
};

export function CronogramaEstudo() {
  const {
    concurso,
    cronograma,
    addCronogramaItem,
    updateCronogramaItem,
    removeCronogramaItem,
  } = useConcurso();
  const [form, setForm] = useState<NovoCronogramaItem>(estadoInicial);

  const cronogramaPorData = useMemo(() => {
    const agrupado = new Map<string, typeof cronograma>();

    cronograma.forEach((item) => {
      const data = item.data || dataLocalIso();
      const itens = agrupado.get(data) ?? [];
      itens.push(item);
      agrupado.set(data, itens);
    });

    return Array.from(agrupado.entries())
      .sort(([dataA], [dataB]) => dataA.localeCompare(dataB))
      .map(([data, itens]) => ({
        data,
        itens: ordenarCronogramaPorDataHora(itens),
      }));
  }, [cronograma]);

  const conteudosDaDisciplina = useMemo(() => {
    const disciplina = concurso.disciplinas.find(
      (item) => item.id === form.disciplinaId,
    );

    return disciplina ? listarConteudos(disciplina.conteudos) : [];
  }, [concurso.disciplinas, form.disciplinaId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const disciplina = encontrarDisciplina(concurso.disciplinas, form.disciplinaId);
    const conteudo = encontrarConteudo(concurso.disciplinas, form.conteudoId);
    const titulo =
      form.titulo.trim() || conteudo?.titulo || disciplina?.nome || "Estudo";

    addCronogramaItem({
      ...form,
      titulo,
      data: form.data || dataLocalIso(),
      conteudoId: form.conteudoId || undefined,
      disciplinaId: form.disciplinaId || undefined,
    });
    setForm({ ...estadoInicial, data: form.data || dataLocalIso() });
  };

  return (
    <main className="page">
      <section className="pageTitle">
        <div>
          <span>Cronograma</span>
          <h1>Cronograma de estudos</h1>
          <p>{concurso.titulo}</p>
        </div>
      </section>

      <section className="studyPlanner">
        <form className="scheduleForm" onSubmit={handleSubmit}>
          <label>
            Data
            <input
              type="date"
              value={form.data}
              onChange={(event) =>
                setForm((current) => ({ ...current, data: event.target.value }))
              }
            />
          </label>

          <label>
            Horario
            <input
              type="time"
              value={form.horario}
              onChange={(event) =>
                setForm((current) => ({ ...current, horario: event.target.value }))
              }
            />
          </label>

          <label>
            Duracao
            <input
              min={5}
              step={5}
              type="number"
              value={form.duracaoMinutos}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  duracaoMinutos: Number(event.target.value),
                }))
              }
            />
          </label>

          <label>
            Disciplina
            <select
              value={form.disciplinaId}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  disciplinaId: event.target.value,
                  conteudoId: "",
                }))
              }
            >
              <option value="">Sem disciplina</option>
              {concurso.disciplinas.map((disciplina) => (
                <option key={disciplina.id} value={disciplina.id}>
                  {disciplina.nome}
                </option>
              ))}
            </select>
          </label>

          <label>
            Conteudo
            <select
              value={form.conteudoId}
              onChange={(event) =>
                setForm((current) => ({ ...current, conteudoId: event.target.value }))
              }
              disabled={!form.disciplinaId}
            >
              <option value="">Sem conteudo</option>
              {conteudosDaDisciplina.map((conteudo) => (
                <option key={conteudo.id} value={conteudo.id}>
                  {conteudo.titulo}
                </option>
              ))}
            </select>
          </label>

          <label className="span2">
            Titulo
            <input
              value={form.titulo}
              onChange={(event) =>
                setForm((current) => ({ ...current, titulo: event.target.value }))
              }
              placeholder="Ex.: Revisao de informatica"
            />
          </label>

          <button type="submit" className="primaryButton">
            Adicionar ao cronograma
          </button>
        </form>

        <section className="weekGrid">
          {cronogramaPorData.map(({ data, itens }) => (
            <article key={data} className="dayColumn">
              <div className="dayHeader">
                <strong>{formatarData(data)}</strong>
                <span>{itens.length}</span>
              </div>

              {itens.length === 0 ? (
                <div className="emptyState compact">Livre</div>
              ) : (
                <div className="scheduleList">
                  {itens.map((item) => {
                    const disciplina = encontrarDisciplina(
                      concurso.disciplinas,
                      item.disciplinaId,
                    );
                    const conteudo = encontrarConteudo(
                      concurso.disciplinas,
                      item.conteudoId,
                    );

                    return (
                      <div
                        key={item.id}
                        className={item.concluido ? "scheduleItem done" : "scheduleItem"}
                      >
                        <div>
                          <span>
                            {item.horario} / {formatarMinutos(item.duracaoMinutos)}
                          </span>
                          <strong>{item.titulo}</strong>
                          <small>
                            {disciplina?.nome || "Sem disciplina"}
                            {conteudo ? ` / ${conteudo.titulo}` : ""}
                          </small>
                        </div>

                        <div className="buttonGroup">
                          <button
                            type="button"
                            className="iconButton"
                            onClick={() =>
                              updateCronogramaItem(item.id, {
                                concluido: !item.concluido,
                              })
                            }
                          >
                            {item.concluido ? "Reabrir" : "Feito"}
                          </button>
                          <button
                            type="button"
                            className="iconButton danger"
                            onClick={() => removeCronogramaItem(item.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
