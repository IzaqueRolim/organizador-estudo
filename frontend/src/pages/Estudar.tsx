import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RegistroLinha } from "../components/RegistroLinha";
import { nomeTipo } from "../components/ItemPlanoModal";
import { useAviso } from "../context/AvisoContext";
import { useDados } from "../context/DadosContext";
import { useConcursoAtual } from "../hooks/useConcursoAtual";
import { useCronometro } from "../hooks/useCronometro";
import { ATIVIDADES, type Atividade } from "../types";
import { listarConteudosComCaminho, ordenarCronograma } from "../utils/estatisticas";
import { formatarCronometro, formatarMinutos, hojeIso } from "../utils/datas";
import { nomeAtividade } from "../utils/rotulos";

interface Rascunho {
  itemId: string | null;
  disciplinaId: string;
  conteudoId: string;
  atividades: Atividade[];
  feitas: number;
  acertos: number;
  foco: number | null;
  anotacao: string;
}

export function Estudar() {
  const { concurso } = useConcursoAtual();
  // remonta a tela ao trocar de concurso, para o cronômetro e a ficha não se misturarem
  return <EstudarConcurso key={concurso.id} />;
}

function EstudarConcurso() {
  const { concurso, cronograma, registros } = useConcursoAtual();
  const { registrarEstudo, removerRegistro, definirStatus, dados } = useDados();
  const aviso = useAviso();
  const [params] = useSearchParams();
  const hoje = hojeIso();
  const cron = useCronometro(`cronometro:${concurso.id}`);

  // a ficha fica guardada no navegador junto com o cronômetro: recarregar a página não perde o que foi digitado
  const chaveRascunho = `rascunho-estudo:${concurso.id}`;
  const [rascunho] = useState<Partial<Rascunho>>(() => {
    try {
      return JSON.parse(window.localStorage.getItem(chaveRascunho) ?? "{}");
    } catch {
      return {};
    }
  });
  const itemInicial = cronograma.find((i) => i.id === params.get("item"));
  const [itemId, setItemId] = useState<string | null>(itemInicial?.id ?? rascunho.itemId ?? null);
  const [disciplinaId, setDisciplinaId] = useState<string>(itemInicial?.disciplinaId ?? rascunho.disciplinaId ?? "");
  const [conteudoId, setConteudoId] = useState<string>(itemInicial?.conteudoId ?? rascunho.conteudoId ?? "");
  const [atividades, setAtividades] = useState<Set<Atividade>>(new Set(rascunho.atividades ?? []));
  const [feitas, setFeitas] = useState(rascunho.feitas ?? 0);
  const [acertos, setAcertos] = useState(rascunho.acertos ?? 0);
  const [foco, setFoco] = useState<number | null>(rascunho.foco ?? null);
  const [anotacao, setAnotacao] = useState(rascunho.anotacao ?? "");
  const [minutosManuais, setMinutosManuais] = useState(30);
  const [concluirConteudo, setConcluirConteudo] = useState(false);

  useEffect(() => {
    const dados: Rascunho = { itemId, disciplinaId, conteudoId, atividades: [...atividades], feitas, acertos, foco, anotacao };
    try {
      window.localStorage.setItem(chaveRascunho, JSON.stringify(dados));
    } catch {
      /* sem armazenamento: a ficha só vale enquanto a página estiver aberta */
    }
  }, [chaveRascunho, itemId, disciplinaId, conteudoId, atividades, feitas, acertos, foco, anotacao]);

  const planejadosHoje = useMemo(() => ordenarCronograma(cronograma.filter((i) => i.data === hoje)), [cronograma, hoje]);
  const disciplina = concurso.disciplinas.find((d) => d.id === disciplinaId);
  const opcoes = useMemo(() => (disciplina ? listarConteudosComCaminho(disciplina.conteudos) : []), [disciplina]);
  const registrosHoje = registros.filter((r) => r.data === hoje).sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
  const totalHoje = registrosHoje.reduce((s, r) => s + r.minutos, 0);

  const escolherItem = (id: string | null) => {
    setItemId(id);
    const item = cronograma.find((i) => i.id === id);
    if (item) {
      setDisciplinaId(item.disciplinaId ?? "");
      setConteudoId(item.conteudoId ?? "");
      const sugeridas: Record<string, Atividade> = { teoria: "aula", questoes: "questoes", revisao: "revisao", resumo: "resumo", simulado: "simulado", leitura: "leitura" };
      setAtividades(new Set([sugeridas[item.tipo]]));
    }
  };

  const alternarAtividade = (a: Atividade) => {
    const novo = new Set(atividades);
    if (novo.has(a)) novo.delete(a); else novo.add(a);
    setAtividades(novo);
  };

  const salvar = (minutos: number, origem: "cronometro" | "manual") => {
    if (minutos < 1) return;
    const qFeitas = atividades.has("questoes") || atividades.has("simulado") ? Math.max(0, feitas) : 0;
    registrarEstudo(concurso.id, {
      disciplinaId: disciplinaId || null,
      conteudoId: conteudoId || null,
      cronogramaItemId: itemId,
      data: hoje,
      minutos,
      atividades: ATIVIDADES.filter((a) => atividades.has(a)),
      questoesFeitas: qFeitas,
      questoesAcertos: Math.min(Math.max(0, acertos), qFeitas),
      foco,
      anotacao: anotacao.trim(),
      iniciadoEm: origem === "cronometro" ? cron.iniciadoEm : null,
    });
    if (concluirConteudo && conteudoId) definirStatus(conteudoId, "concluido", true);
    aviso.ok(`Sessão salva: ${formatarMinutos(minutos)}${disciplina ? ` de ${disciplina.nome}` : ""}`);
    cron.zerar();
    setItemId(null);
    setAtividades(new Set());
    setFeitas(0); setAcertos(0); setFoco(null); setAnotacao(""); setConcluirConteudo(false);
  };

  const minutosCronometro = Math.max(1, Math.round(cron.segundos / 60));
  const mostrarQuestoes = atividades.has("questoes") || atividades.has("simulado");
  const conteudoSelecionado = dados.conteudos.find((c) => c.id === conteudoId);

  return (
    <>
      <div className="pagina-cabecalho">
        <div>
          <h1>Estudar agora</h1>
          <p>Escolha o que vai estudar, ligue o cronômetro e, ao terminar, marque o que fez.</p>
        </div>
        <span className="selo foco">Hoje: {formatarMinutos(totalHoje)}</span>
      </div>

      <div className="estudo-layout">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <section className={`cronometro${cron.rodando ? " rodando" : ""}`} aria-label="Cronômetro">
            <span className="rotulo">{cron.rodando ? "Estudando…" : cron.segundos > 0 ? "Pausado" : "Pronto para começar"}</span>
            <div className="tempo" role="timer" aria-live="off">{formatarCronometro(cron.segundos)}</div>
            <div className="tempo-acoes">
              {cron.rodando ? (
                <button className="btn" onClick={cron.pausar}>Pausar</button>
              ) : (
                <button className="btn destaque" onClick={cron.iniciar}>{cron.segundos > 0 ? "Continuar" : "Começar a estudar"}</button>
              )}
              <button className="btn destaque" disabled={cron.segundos < 30} onClick={() => { cron.pausar(); salvar(minutosCronometro, "cronometro"); }}>
                Finalizar e salvar
              </button>
              <button className="btn" disabled={cron.segundos === 0} onClick={() => { if (window.confirm("Descartar o tempo medido?")) cron.zerar(); }}>
                Descartar
              </button>
            </div>
            {cron.segundos > 0 && cron.segundos < 30 && <span className="rotulo">Estude ao menos 30 segundos para salvar, ou use o registro manual.</span>}
            <div className="manual">
              <span>Esqueceu de ligar o cronômetro? Registre o tempo à mão:</span>
              <div className="linha">
                <input type="number" min={1} max={1440} value={minutosManuais} onChange={(e) => setMinutosManuais(Number(e.target.value))} aria-label="Minutos estudados" />
                <span>minutos</span>
                <button className="btn" onClick={() => salvar(minutosManuais, "manual")} disabled={!(minutosManuais >= 1)}>Registrar</button>
              </div>
            </div>
          </section>

          {planejadosHoje.length > 0 && (
            <section className="painel" aria-label="Planejado para hoje">
              <div className="painel-cabecalho"><h2>Planejado para hoje</h2></div>
              <div className="sugestoes-hoje">
                {planejadosHoje.map((i) => {
                  const d = concurso.disciplinas.find((x) => x.id === i.disciplinaId);
                  return (
                    <button key={i.id} type="button" className="sugestao" aria-pressed={itemId === i.id} onClick={() => escolherItem(itemId === i.id ? null : i.id)}>
                      <i className="pontinho" style={{ background: d?.cor ?? "var(--linha-forte)" }} />
                      <span className="info">
                        <strong>{i.titulo}</strong>
                        <small>{i.horario} · {formatarMinutos(i.duracaoMinutos)} · {nomeTipo[i.tipo]}{i.concluido ? " · feito" : ""}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <form className="painel" onSubmit={(e) => e.preventDefault()} aria-label="O que você estudou" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="grade-form">
            <label className="campo">
              Disciplina
              <select value={disciplinaId} onChange={(e) => { setDisciplinaId(e.target.value); setConteudoId(""); setItemId(null); }}>
                <option value="">Sem disciplina</option>
                {concurso.disciplinas.map((d) => <option key={d.id} value={d.id}>{d.nome}</option>)}
              </select>
            </label>
            <label className="campo">
              Conteúdo do edital
              <select value={conteudoId} disabled={!disciplina} onChange={(e) => setConteudoId(e.target.value)}>
                <option value="">{disciplina ? "Nenhum específico" : "Escolha a disciplina"}</option>
                {opcoes.map((o) => (
                  <option key={o.conteudo.id} value={o.conteudo.id}>
                    {"  ".repeat(o.nivel)}{o.conteudo.titulo.length > 80 ? o.conteudo.titulo.slice(0, 80) + "…" : o.conteudo.titulo}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="fraco" style={{ fontWeight: 600, marginBottom: 6 }}>O que você fez</legend>
            <div className="chips">
              {ATIVIDADES.map((a) => (
                <label key={a} className="chip-opcao">
                  <input type="checkbox" checked={atividades.has(a)} onChange={() => alternarAtividade(a)} />
                  <span>{nomeAtividade[a]}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {mostrarQuestoes && (
            <div className="questoes-grade">
              <label className="campo">
                Questões feitas
                <input type="number" min={0} value={feitas} onChange={(e) => setFeitas(Math.max(0, Number(e.target.value)))} />
              </label>
              <label className="campo">
                Acertos
                <input type="number" min={0} max={feitas} value={acertos} onChange={(e) => setAcertos(Math.max(0, Number(e.target.value)))} />
              </label>
              <div className="taxa" aria-live="polite">{feitas > 0 ? `${Math.round((Math.min(acertos, feitas) / feitas) * 100)}%` : "—"}</div>
            </div>
          )}

          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="fraco" style={{ fontWeight: 600, marginBottom: 6 }}>Como foi o foco (1 = disperso, 5 = total)</legend>
            <div className="foco-opcoes">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n}>
                  <input type="radio" name="foco" checked={foco === n} onChange={() => setFoco(n)} />
                  <span>{n}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="campo">
            Resumo do dia
            <textarea rows={5} value={anotacao} onChange={(e) => setAnotacao(e.target.value)} placeholder="O que você estudou, o que errou, o que precisa rever amanhã…" />
          </label>

          {conteudoSelecionado && conteudoSelecionado.status !== "concluido" && (
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 600 }}>
              <input type="checkbox" checked={concluirConteudo} onChange={(e) => setConcluirConteudo(e.target.checked)} />
              Marcar “{conteudoSelecionado.titulo.length > 60 ? conteudoSelecionado.titulo.slice(0, 60) + "…" : conteudoSelecionado.titulo}” como concluído
            </label>
          )}
          <p className="fraco">Os dados desta ficha entram no registro quando você finaliza o cronômetro ou usa o registro manual.</p>
        </form>
      </div>

      <section className="painel" style={{ marginTop: 20 }} aria-label="Registros de hoje">
        <div className="painel-cabecalho">
          <h2>Estudado hoje</h2>
          <span className="selo">{formatarMinutos(totalHoje)}</span>
        </div>
        {registrosHoje.length === 0 ? (
          <div className="vazio pequeno">Nenhuma sessão registrada hoje.</div>
        ) : (
          <div className="lista-registros">
            {registrosHoje.map((r) => <RegistroLinha key={r.id} registro={r} concurso={concurso} onExcluir={() => removerRegistro(r.id)} />)}
          </div>
        )}
      </section>
    </>
  );
}
