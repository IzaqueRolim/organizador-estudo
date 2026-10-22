import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IcoCheck, IcoMais } from "../components/Icones";
import { ItemPlanoModal, nomeTipo } from "../components/ItemPlanoModal";
import { SugerirSemanaModal } from "../components/SugerirSemanaModal";
import { useAviso } from "../context/AvisoContext";
import { useDados } from "../context/DadosContext";
import { useConcursoAtual } from "../hooks/useConcursoAtual";
import type { CronogramaItem } from "../types";
import { calcularDistribuicao, estaAtrasado, minutosPlanejados, ordenarCronograma } from "../utils/estatisticas";
import {
  diaSemanaCurto, diasDaSemana, diasDoMes, formatarData, formatarHoras, formatarMinutos, hojeIso,
  inicioDoMes, mesAno, somarDias, somarMeses,
} from "../utils/datas";

type Visao = "semana" | "mes";

const capitalizar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export function Planejamento() {
  const { concurso, cronograma, registros } = useConcursoAtual();
  const d = useDados();
  const aviso = useAviso();
  const hoje = hojeIso();
  const [visao, setVisao] = useState<Visao>("semana");
  const [ref, setRef] = useState(hoje);
  const [modal, setModal] = useState<{ item?: CronogramaItem; data: string } | null>(null);
  const [sugerir, setSugerir] = useState(false);

  const semana = diasDaSemana(ref);
  const inicioSemana = semana[0];
  const fimSemana = semana[6];
  const porDia = useMemo(() => {
    const mapa = new Map<string, CronogramaItem[]>();
    cronograma.forEach((i) => mapa.set(i.data, [...(mapa.get(i.data) ?? []), i]));
    mapa.forEach((v, k) => mapa.set(k, ordenarCronograma(v)));
    return mapa;
  }, [cronograma]);

  const itensSemana = cronograma.filter((i) => i.data >= inicioSemana && i.data <= fimSemana);
  const planejadoSemana = minutosPlanejados(itensSemana);
  const metaMin = concurso.metaHorasSemana * 60;
  const atrasados = cronograma.filter((i) => estaAtrasado(i, hoje));
  const fatias = useMemo(() => calcularDistribuicao(concurso, registros, "peso", fimSemana), [concurso, registros, fimSemana]);
  const cor = (id: string | null) => concurso.disciplinas.find((x) => x.id === id)?.cor;
  const nomeDisc = (id: string | null) => concurso.disciplinas.find((x) => x.id === id)?.nome;

  const mover = (delta: number) => setRef(visao === "semana" ? somarDias(ref, 7 * delta) : somarMeses(ref, delta));

  const semanaAnterior = cronograma.filter((i) => i.data >= somarDias(inicioSemana, -7) && i.data <= somarDias(fimSemana, -7));

  const renderItem = (i: CronogramaItem) => (
    <div key={i.id} className="item-wrap">
      <button
        type="button"
        className={`status-btn ${i.concluido ? "concluido" : ""}`}
        aria-label={`${i.titulo}: ${i.concluido ? "feito. Reabrir" : "marcar como feito"}`}
        onClick={() => d.atualizarCronograma(i.id, { concluido: !i.concluido })}
      >
        {i.concluido && <IcoCheck />}
      </button>
      <button
        type="button"
        className={`item-plano${i.concluido ? " feito" : ""}${estaAtrasado(i, hoje) ? " atrasado" : ""}`}
        style={{ ["--cor" as string]: cor(i.disciplinaId) }}
        onClick={() => setModal({ item: i, data: i.data })}
      >
        <span className="hora">{i.horario} · {formatarMinutos(i.duracaoMinutos)}</span>
        <span className="nome" title={i.titulo}>{i.titulo}</span>
        <span className="sub">{[nomeDisc(i.disciplinaId), nomeTipo[i.tipo]].filter(Boolean).join(" · ")}</span>
      </button>
    </div>
  );

  return (
    <>
      <div className="pagina-cabecalho">
        <div>
          <h1>Planejamento</h1>
          <p>Distribua o edital pelos dias. Cada bloco aponta para uma disciplina e um conteúdo, e vira “feito” sozinho quando você registra o estudo.</p>
        </div>
        <div className="acoes">
          <button className="btn" onClick={() => setSugerir(true)} disabled={concurso.disciplinas.length === 0}>Montar semana pelos pesos</button>
          <button className="btn principal" onClick={() => setModal({ data: ref >= hoje ? ref : hoje })}>
            <span style={{ width: 16, height: 16, display: "inline-flex" }}><IcoMais /></span> Planejar estudo
          </button>
        </div>
      </div>

      {concurso.disciplinas.length === 0 && (
        <div className="vazio" style={{ marginBottom: 16 }}>
          <strong>Cadastre as disciplinas do edital para planejar com conteúdo</strong>
          <Link className="btn principal" to="../edital">Ir para o edital</Link>
        </div>
      )}

      {atrasados.length > 0 && (
        <div className="aviso-atraso" role="status">
          <span>{atrasados.length} {atrasados.length === 1 ? "estudo de dia anterior ficou" : "estudos de dias anteriores ficaram"} sem fazer.</span>
          <button className="btn pequeno" onClick={() => {
            atrasados.forEach((i) => d.atualizarCronograma(i.id, { data: hoje }));
            aviso.ok("Estudos atrasados movidos para hoje");
          }}>Mover para hoje</button>
        </div>
      )}

      <div className="barra-ferramentas" style={{ justifyContent: "space-between" }}>
        <div className="nav-periodo">
          <button className="btn pequeno" onClick={() => mover(-1)} aria-label={visao === "semana" ? "Semana anterior" : "Mês anterior"}>‹</button>
          <strong>
            {visao === "semana"
              ? `${formatarData(inicioSemana, { day: "2-digit", month: "short" })} a ${formatarData(fimSemana, { day: "2-digit", month: "short" })}`
              : capitalizar(mesAno(inicioDoMes(ref)))}
          </strong>
          <button className="btn pequeno" onClick={() => mover(1)} aria-label={visao === "semana" ? "Próxima semana" : "Próximo mês"}>›</button>
          <button className="btn pequeno" onClick={() => setRef(hoje)}>Hoje</button>
        </div>
        <div className="segmentado" role="group" aria-label="Tipo de visão">
          <button aria-pressed={visao === "semana"} onClick={() => setVisao("semana")}>Semana</button>
          <button aria-pressed={visao === "mes"} onClick={() => setVisao("mes")}>Mês</button>
        </div>
      </div>

      {visao === "semana" ? (
        <>
          <section className="painel" style={{ marginBottom: 16 }} aria-label="Resumo da semana">
            <div className="resumo-semana">
              <div style={{ flex: "1 1 260px" }}>
                <div className="linha-meta">
                  <div className="topo"><span>Planejado na semana</span><span>{formatarHoras(planejadoSemana / 60)} de {formatarHoras(concurso.metaHorasSemana)}</span></div>
                  <div className={`barra grossa${metaMin && planejadoSemana >= metaMin ? " ok" : ""}`}><span style={{ width: `${metaMin ? Math.min(100, (planejadoSemana / metaMin) * 100) : 0}%` }} /></div>
                </div>
              </div>
              <div className="fraco">{itensSemana.filter((i) => i.concluido).length} de {itensSemana.length} blocos feitos</div>
              {itensSemana.length === 0 && semanaAnterior.length > 0 && (
                <button className="btn pequeno" onClick={() => {
                  d.addCronogramaVarios(concurso.id, semanaAnterior.map((i) => ({
                    data: somarDias(i.data, 7), horario: i.horario, duracaoMinutos: i.duracaoMinutos, disciplinaId: i.disciplinaId,
                    conteudoId: null, titulo: i.titulo, descricao: i.descricao, tipo: i.tipo,
                  })));
                  aviso.ok("Semana anterior copiada (sem repetir o conteúdo)");
                }}>Copiar a semana anterior</button>
              )}
            </div>
            {fatias.length > 0 && (
              <details style={{ marginTop: 14 }}>
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>Planejado por disciplina nesta semana</summary>
                <div className="ajuda-meta" style={{ marginTop: 12 }}>
                  {fatias.filter((f) => f.horasSemana > 0).map((f) => {
                    const plan = itensSemana.filter((i) => i.disciplinaId === f.disciplina.id).reduce((s, i) => s + i.duracaoMinutos, 0);
                    const pct = f.horasSemana ? Math.min(100, (plan / 60 / f.horasSemana) * 100) : 0;
                    return (
                      <div key={f.disciplina.id} className="linha-meta">
                        <div className="topo"><span>{f.disciplina.nome}</span><span>{formatarHoras(plan / 60)} / {formatarHoras(f.horasSemana)}</span></div>
                        <div className="barra"><span style={{ width: `${pct}%`, background: f.disciplina.cor }} /></div>
                      </div>
                    );
                  })}
                </div>
              </details>
            )}
          </section>

          <div className="semana">
            {semana.map((dia) => {
              const itens = porDia.get(dia) ?? [];
              return (
                <section key={dia} className={`dia${dia === hoje ? " hoje" : ""}${dia < hoje ? " passado" : ""}`} aria-label={formatarData(dia, { weekday: "long", day: "numeric", month: "long" })}>
                  <div className="dia-topo">
                    <strong>{diaSemanaCurto(dia)}<small>{formatarData(dia, { day: "2-digit", month: "2-digit" })}</small></strong>
                    {itens.length > 0 && <span className="total">{formatarMinutos(minutosPlanejados(itens))}</span>}
                    <button className="btn pequeno fantasma adicionar" onClick={() => setModal({ data: dia })}>+ Adicionar</button>
                  </div>
                  <div className="dia-itens">
                    {itens.length === 0 ? <span className="fraco livre">Dia livre</span> : itens.map(renderItem)}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      ) : (
        <div>
          <div className="mes" role="grid" aria-label={mesAno(inicioDoMes(ref))}>
            {semana.map((dia) => <div key={dia} className="cabeca">{diaSemanaCurto(dia)}</div>)}
            {diasDoMes(ref).map((dia) => {
              const itens = porDia.get(dia) ?? [];
              const fora = dia.slice(0, 7) !== ref.slice(0, 7);
              return (
                <button
                  key={dia}
                  type="button"
                  className={`celula-mes${fora ? " fora" : ""}${dia === hoje ? " hoje" : ""}`}
                  onClick={() => { setRef(dia); setVisao("semana"); }}
                  aria-label={`${formatarData(dia, { day: "numeric", month: "long" })}: ${itens.length} estudos`}
                >
                  <span className="dia-num">{Number(dia.slice(8))}{itens.length > 0 && <small>{formatarMinutos(minutosPlanejados(itens))}</small>}</span>
                  {itens.slice(0, 3).map((i) => (
                    <span key={i.id} className="mini" style={{ ["--cor" as string]: cor(i.disciplinaId) }}>{i.concluido ? "✓ " : ""}{i.titulo}</span>
                  ))}
                  {itens.length > 3 && <span className="mais">+{itens.length - 3} mais</span>}
                </button>
              );
            })}
          </div>
          <p className="fraco" style={{ marginTop: 10 }}>Clique em um dia para abrir a semana e editar os blocos.</p>
        </div>
      )}

      {modal && (
        <ItemPlanoModal
          concurso={concurso}
          item={modal.item}
          dataInicial={modal.data}
          onFechar={() => setModal(null)}
          onSalvar={(dados) => {
            if (modal.item) d.atualizarCronograma(modal.item.id, dados);
            else d.addCronograma(concurso.id, dados);
            setModal(null);
          }}
          onExcluir={modal.item ? () => { d.removerCronograma(modal.item!.id); setModal(null); } : undefined}
        />
      )}
      {sugerir && (
        <SugerirSemanaModal
          concurso={concurso}
          registros={registros}
          inicioSemana={inicioSemana}
          onFechar={() => setSugerir(false)}
          onCriar={(itens) => {
            d.addCronogramaVarios(concurso.id, itens);
            aviso.ok(`${itens.length} blocos adicionados à semana`);
            setSugerir(false);
          }}
        />
      )}
    </>
  );
}

