import { useEffect, useMemo, useState } from "react";
import { useConcurso } from "../../hooks/useConcurso";
import {
  dataLocalIso,
  formatarData,
  formatarMinutos,
  listarConteudos,
  ordenarCronogramaPorDataHora,
} from "../../utils/concursoStats";

const formatarCronometro = (segundos: number) => {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const resto = segundos % 60;

  return [horas, minutos, resto]
    .map((parte) => String(parte).padStart(2, "0"))
    .join(":");
};

export function Estudos() {
  const { concurso, cronograma, registrosEstudo, registrarEstudo } = useConcurso();
  const [rodando, setRodando] = useState(false);
  const [segundos, setSegundos] = useState(0);
  const [disciplinaId, setDisciplinaId] = useState("");
  const [conteudoId, setConteudoId] = useState("");
  const [anotacao, setAnotacao] = useState("");

  const conteudos = useMemo(() => {
    const disciplina = concurso.disciplinas.find(
      (item) => item.id === disciplinaId,
    );

    return disciplina ? listarConteudos(disciplina.conteudos) : [];
  }, [concurso.disciplinas, disciplinaId]);

  const proximoEstudo = useMemo(() => {
    const agora = new Date();
    const agoraMillis = agora.getTime();

    const futuros = ordenarCronogramaPorDataHora(cronograma).filter((item) => {
      const data = item.data || dataLocalIso();
      const [ano, mes, dia] = data.split("-").map(Number);
      const horario = item.horario || "19:00";
      const [hora, minuto] = horario.split(":").map(Number);
      const dataHora = new Date(ano, mes - 1, dia, hora, minuto);

      return dataHora.getTime() >= agoraMillis;
    });

    return futuros[0];
  }, [cronograma]);

  useEffect(() => {
    if (!rodando) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSegundos((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [rodando]);

  const finalizar = () => {
    if (segundos === 0) {
      return;
    }

    registrarEstudo({
      disciplinaId: disciplinaId || undefined,
      conteudoId: conteudoId || undefined,
      data: dataLocalIso(),
      minutos: Math.max(1, Math.round(segundos / 60)),
      anotacao,
    });
    setRodando(false);
    setSegundos(0);
    setAnotacao("");
  };

  const totalHoje = registrosEstudo
    .filter((registro) => registro.data === dataLocalIso())
    .reduce((total, registro) => total + registro.minutos, 0);

  return (
    <main className="page">
      <section className="pageTitle">
        <div>
          <span>Estudos</span>
          <h1>Sessao com cronometro</h1>
          <p>{concurso.titulo}</p>
        </div>
      </section>

      <section className="studySession">
        <div className="timerPanel">
          <span>Tempo atual</span>
          <strong>{formatarCronometro(segundos)}</strong>
          <div className="timerActions">
            <button
              type="button"
              className="primaryButton"
              onClick={() => setRodando(true)}
              disabled={rodando}
            >
              Comecar a estudar
            </button>
            <button
              type="button"
              className="ghostButton"
              onClick={() => setRodando(false)}
              disabled={!rodando}
            >
              Pausar
            </button>
            <button
              type="button"
              className="ghostButton danger"
              onClick={finalizar}
              disabled={segundos === 0}
            >
              Finalizar estudo
            </button>
          </div>
        </div>

        <form className="sessionForm">
          <label>
            Disciplina
            <select
              value={disciplinaId}
              onChange={(event) => {
                setDisciplinaId(event.target.value);
                setConteudoId("");
              }}
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
              value={conteudoId}
              onChange={(event) => setConteudoId(event.target.value)}
              disabled={!disciplinaId}
            >
              <option value="">Sem conteudo</option>
              {conteudos.map((conteudo) => (
                <option key={conteudo.id} value={conteudo.id}>
                  {conteudo.titulo}
                </option>
              ))}
            </select>
          </label>

          <label>
            Anotacao
            <textarea
              rows={5}
              value={anotacao}
              onChange={(event) => setAnotacao(event.target.value)}
              placeholder="Resumo rapido da sessao"
            />
          </label>
        </form>
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>Próximo estudo</h2>
          {proximoEstudo ? <span>{formatarData(proximoEstudo.data)}</span> : null}
        </div>

        {proximoEstudo ? (
          <div className="historyItem">
            <strong>{proximoEstudo.titulo}</strong>
            <p>
              {proximoEstudo.horario} · {formatarMinutos(proximoEstudo.duracaoMinutos)}
            </p>
            <span>{proximoEstudo.disciplinaId ? "Disciplina atribuída" : "Sem disciplina"}</span>
          </div>
        ) : (
          <div className="emptyState compact">Nenhum estudo agendado para os próximos dias.</div>
        )}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>Hoje</h2>
          <span>{formatarMinutos(totalHoje)}</span>
        </div>

        {registrosEstudo.filter((registro) => registro.data === dataLocalIso()).length ===
        0 ? (
          <div className="emptyState compact">Nenhum registro hoje.</div>
        ) : (
          <div className="historyList">
            {registrosEstudo
              .filter((registro) => registro.data === dataLocalIso())
              .map((registro) => (
                <div key={registro.id} className="historyItem">
                  <strong>{formatarMinutos(registro.minutos)}</strong>
                  {registro.anotacao && <p>{registro.anotacao}</p>}
                </div>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}
