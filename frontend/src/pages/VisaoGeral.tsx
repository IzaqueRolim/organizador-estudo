import { useMemo } from "react";
import { Link } from "react-router-dom";
import { IcoCheck } from "../components/Icones";
import { nomeTipo } from "../components/ItemPlanoModal";
import { useDados } from "../context/DadosContext";
import { useConcursoAtual } from "../hooks/useConcursoAtual";
import { calcularDistribuicao, contarConcurso, minutosNoPeriodo, ordenarCronograma, sequenciaDeDias } from "../utils/estatisticas";
import { diaSemanaLongo, diasAteProva, formatarData, formatarHoras, formatarMinutos, hojeIso, somarDias } from "../utils/datas";

export function VisaoGeral() {
  const { concurso, cronograma, registros } = useConcursoAtual();
  const { atualizarCronograma } = useDados();
  const hoje = hojeIso();

  const dias = diasAteProva(concurso.dataProva);
  const cont = contarConcurso(concurso);
  const planejadosHoje = useMemo(() => ordenarCronograma(cronograma.filter((i) => i.data === hoje)), [cronograma, hoje]);
  const proximos = useMemo(
    () => ordenarCronograma(cronograma.filter((i) => i.data > hoje && !i.concluido)).slice(0, 5),
    [cronograma, hoje],
  );
  const minutosSemana = minutosNoPeriodo(registros, somarDias(hoje, -6), hoje);
  const minutosHoje = minutosNoPeriodo(registros, hoje, hoje);
  const sequencia = sequenciaDeDias(registros, hoje);
  const fatias = useMemo(
    () => [...calcularDistribuicao(concurso, registros, "peso")].sort((a, b) => b.fracao - a.fracao),
    [concurso, registros],
  );
  const cor = (id: string | null) => concurso.disciplinas.find((d) => d.id === id)?.cor;
  const nomeDisc = (id: string | null) => concurso.disciplinas.find((d) => d.id === id)?.nome;

  const passos = [
    { feito: Boolean(concurso.dataProva), titulo: "Informe a data da prova", detalhe: "Define a contagem regressiva e as horas até a prova.", para: "dados" },
    { feito: concurso.disciplinas.length > 0, titulo: "Cadastre as disciplinas do edital", detalhe: "Com o peso de cada uma.", para: "edital" },
    { feito: cont.total > 0, titulo: "Cole os conteúdos de cada disciplina", detalhe: "Um por linha, direto do edital.", para: "edital" },
    { feito: cronograma.length > 0, titulo: "Planeje a primeira semana", detalhe: "Monte pelos pesos ou escolha dia a dia.", para: "planejamento" },
  ];
  const pendentes = passos.filter((p) => !p.feito);
  const minutosPlanejadosHoje = planejadosHoje.reduce((s, i) => s + i.duracaoMinutos, 0);

  return (
    <>
      <div className="pagina-cabecalho">
        <div>
          <h1>{concurso.titulo}</h1>
          <p>{[concurso.cargo, concurso.orgao, concurso.banca].filter(Boolean).join(" · ") || "Complete os dados do concurso para ver tudo aqui."}</p>
        </div>
        {concurso.urlEdital && <a className="btn" href={concurso.urlEdital} target="_blank" rel="noreferrer">Abrir edital</a>}
      </div>

      <section className="hoje-bloco" aria-label="Hoje">
        <div>
          <h2>{diaSemanaLongo(hoje).replace(/^./, (c) => c.toUpperCase())}, {formatarData(hoje, { day: "numeric", month: "long" })}</h2>
          <p>
            {planejadosHoje.length > 0
              ? `${planejadosHoje.length} ${planejadosHoje.length === 1 ? "bloco planejado" : "blocos planejados"} (${formatarMinutos(minutosPlanejadosHoje)}). Você já estudou ${formatarMinutos(minutosHoje)} hoje.`
              : `Nada planejado para hoje. Você já estudou ${formatarMinutos(minutosHoje)}.`}
          </p>
        </div>
        <Link className="btn" to="estudar">Estudar agora</Link>
      </section>

      <div className="metricas">
        <div className="metrica">
          <div className="rotulo">Dias para a prova</div>
          <div className="valor">{dias === null ? "—" : Math.max(dias, 0)}</div>
          <div className="detalhe">{concurso.dataProva ? formatarData(concurso.dataProva) : "sem data definida"}</div>
        </div>
        <div className="metrica">
          <div className="rotulo">Edital concluído</div>
          <div className="valor">{cont.percentual}%</div>
          <div className="detalhe">{cont.concluidos} de {cont.total} conteúdos</div>
        </div>
        <div className="metrica">
          <div className="rotulo">Últimos 7 dias</div>
          <div className="valor">{formatarHoras(minutosSemana / 60)}</div>
          <div className="detalhe">meta de {formatarHoras(concurso.metaHorasSemana)} por semana</div>
        </div>
        <div className="metrica">
          <div className="rotulo">Sequência</div>
          <div className="valor">{sequencia}</div>
          <div className="detalhe">{sequencia === 1 ? "dia seguido" : "dias seguidos"} estudando</div>
        </div>
      </div>

      {pendentes.length > 0 && (
        <section className="painel" style={{ marginBottom: 20 }} aria-label="Primeiros passos">
          <div className="painel-cabecalho"><h2>Para começar</h2><span className="fraco">{passos.length - pendentes.length} de {passos.length} feitos</span></div>
          <div className="passos">
            {passos.map((p) => (
              <Link key={p.titulo} to={p.para} className={`passo${p.feito ? " feito" : ""}`}>
                <span className="marca-passo">{p.feito && <IcoCheck />}</span>
                <span><strong>{p.titulo}</strong><small>{p.detalhe}</small></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="duas-colunas">
        <div>
          <section className="painel" aria-label="Estudos de hoje">
            <div className="painel-cabecalho"><h2>Planejado para hoje</h2><Link to="planejamento">Ver planejamento</Link></div>
            {planejadosHoje.length === 0 ? (
              <div className="vazio pequeno">
                Nenhum bloco para hoje.
                <Link className="btn pequeno" to="planejamento">Planejar</Link>
              </div>
            ) : (
              <ul className="lista-simples">
                {planejadosHoje.map((i) => (
                  <li key={i.id}>
                    <button
                      type="button"
                      className={`status-btn ${i.concluido ? "concluido" : ""}`}
                      aria-label={`${i.titulo}: ${i.concluido ? "feito. Reabrir" : "marcar como feito"}`}
                      onClick={() => atualizarCronograma(i.id, { concluido: !i.concluido })}
                    >{i.concluido && <IcoCheck />}</button>
                    <span className="pontinho" style={{ background: cor(i.disciplinaId) ?? "var(--linha-forte)" }} />
                    <span className="texto">
                      <strong style={i.concluido ? { textDecoration: "line-through", color: "var(--tinta-3)" } : undefined}>{i.titulo}</strong>
                      <small>{i.horario} · {formatarMinutos(i.duracaoMinutos)} · {nomeDisc(i.disciplinaId) ?? "Sem disciplina"} · {nomeTipo[i.tipo]}</small>
                    </span>
                    {!i.concluido && <Link className="btn pequeno" to={`estudar?item=${i.id}`}>Estudar</Link>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {proximos.length > 0 && (
            <section className="painel" aria-label="Próximos estudos">
              <div className="painel-cabecalho"><h2>Próximos dias</h2></div>
              <ul className="lista-simples">
                {proximos.map((i) => (
                  <li key={i.id}>
                    <span className="pontinho" style={{ background: cor(i.disciplinaId) ?? "var(--linha-forte)" }} />
                    <span className="texto">
                      <strong>{i.titulo}</strong>
                      <small style={{ textTransform: "capitalize" }}>{formatarData(i.data, { weekday: "short", day: "2-digit", month: "2-digit" })} · {i.horario} · {nomeDisc(i.disciplinaId) ?? "Sem disciplina"}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <section className="painel" aria-label="Disciplinas">
          <div className="painel-cabecalho"><h2>Disciplinas</h2><Link to="pesos">Pesos e metas</Link></div>
          {fatias.length === 0 ? (
            <div className="vazio pequeno">Nenhuma disciplina cadastrada.<Link className="btn pequeno" to="edital">Abrir edital</Link></div>
          ) : (
            <ul className="lista-simples">
              {fatias.map((f) => (
                <li key={f.disciplina.id}>
                  <span className="texto">
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <strong style={{ display: "flex", gap: 8, alignItems: "center" }}><i className="pontinho" style={{ background: f.disciplina.cor }} />{f.disciplina.nome}</strong>
                      <span className="fraco num">{Math.round(f.fracao * 100)}% do tempo</span>
                    </div>
                    <div className="barra ok" style={{ marginTop: 6 }}><span style={{ width: `${f.contagem.percentual}%` }} /></div>
                    <small>{f.contagem.concluidos}/{f.contagem.total} conteúdos · {formatarHoras(f.horasEstudadasSemana)} de {formatarHoras(f.horasSemana)} na semana</small>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
