import { useMemo, useState } from "react";
import { RegistroLinha } from "../components/RegistroLinha";
import { useDados } from "../context/DadosContext";
import { useConcursoAtual } from "../hooks/useConcursoAtual";
import { calcularDistribuicao, desempenhoQuestoes, minutosPorDia, sequenciaDeDias } from "../utils/estatisticas";
import { formatarData, formatarHoras, formatarMinutos, hojeIso, inicioDaSemana, somarDias } from "../utils/datas";

const SEMANAS_MAPA = 20;

const nivel = (min: number) => (min >= 180 ? "n4" : min >= 90 ? "n3" : min >= 45 ? "n2" : min > 0 ? "n1" : "");

export function Historico() {
  const { concurso, registros } = useConcursoAtual();
  const { removerRegistro } = useDados();
  const hoje = hojeIso();
  const [filtro, setFiltro] = useState("");
  const [limite, setLimite] = useState(15);

  const porDia = useMemo(() => minutosPorDia(registros), [registros]);
  const total = registros.reduce((s, r) => s + r.minutos, 0);
  const diasAtivos = porDia.size;
  const questoes = desempenhoQuestoes(registros);

  // grade: colunas = semanas (segunda a domingo), terminando na semana atual
  const inicioMapa = somarDias(inicioDaSemana(hoje), -7 * (SEMANAS_MAPA - 1));
  const celulas = Array.from({ length: SEMANAS_MAPA * 7 }, (_, i) => somarDias(inicioMapa, i));

  const semanas = Array.from({ length: 8 }, (_, i) => {
    const ini = somarDias(inicioDaSemana(hoje), -7 * (7 - i));
    const fim = somarDias(ini, 6);
    const min = registros.filter((r) => r.data >= ini && r.data <= fim).reduce((s, r) => s + r.minutos, 0);
    return { ini, min };
  });
  const maxSemana = Math.max(...semanas.map((s) => s.min), 60);

  const fatias = useMemo(() => [...calcularDistribuicao(concurso, registros, "peso")].sort((a, b) => b.fracao - a.fracao), [concurso, registros]);
  const totalHoras = fatias.reduce((s, f) => s + f.horasTotaisEstudadas, 0);

  const lista = registros
    .filter((r) => !filtro || r.disciplinaId === filtro)
    .sort((a, b) => b.data.localeCompare(a.data) || b.criadoEm.localeCompare(a.criadoEm));

  return (
    <>
      <div className="pagina-cabecalho">
        <div><h1>Histórico</h1><p>Sua constância, o desempenho em questões e se o tempo estudado está seguindo os pesos.</p></div>
      </div>

      <div className="metricas">
        <div className="metrica"><div className="rotulo">Total estudado</div><div className="valor">{formatarMinutos(total)}</div><div className="detalhe">{registros.length} {registros.length === 1 ? "sessão" : "sessões"}</div></div>
        <div className="metrica"><div className="rotulo">Dias com estudo</div><div className="valor">{diasAtivos}</div><div className="detalhe">sequência atual: {sequenciaDeDias(registros, hoje)}</div></div>
        <div className="metrica"><div className="rotulo">Questões feitas</div><div className="valor">{questoes.feitas}</div><div className="detalhe">{questoes.taxa === null ? "nenhuma registrada" : `${questoes.taxa}% de acerto`}</div></div>
        <div className="metrica"><div className="rotulo">Média por dia ativo</div><div className="valor">{diasAtivos ? formatarMinutos(total / diasAtivos) : "—"}</div></div>
      </div>

      <div className="duas-colunas" style={{ marginBottom: 20 }}>
        <section className="painel" aria-label="Mapa de constância">
          <div className="painel-cabecalho"><h2>Constância</h2><p>Últimas {SEMANAS_MAPA} semanas</p></div>
          <div className="mapa-habitos" role="img" aria-label={`${diasAtivos} dias com estudo registrado`}>
            {celulas.map((dia) => {
              const min = porDia.get(dia) ?? 0;
              return <div key={dia} className={`cel ${dia > hoje ? "" : nivel(min)}${dia === hoje ? " hoje" : ""}`} style={dia > hoje ? { opacity: 0.25 } : undefined} title={`${formatarData(dia)}: ${formatarMinutos(min)}`} />;
            })}
          </div>
          <div className="legenda-habitos">
            menos
            <span className="cel" style={{ background: "var(--linha)" }} />
            <span className="cel" style={{ background: "#c9d2ff" }} />
            <span className="cel" style={{ background: "#93a3ff" }} />
            <span className="cel" style={{ background: "#5a70f2" }} />
            <span className="cel" style={{ background: "var(--caneta)" }} />
            mais
          </div>
        </section>

        <section className="painel" aria-label="Horas por semana">
          <div className="painel-cabecalho"><h2>Horas por semana</h2><p>Meta: {formatarHoras(concurso.metaHorasSemana)}</p></div>
          <div className="barras-semanais">
            {semanas.map((s) => (
              <div key={s.ini} className="coluna">
                <span className="valor-barra">{s.min ? (s.min / 60).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) : ""}</span>
                <div className="haste" style={{ height: `${(s.min / maxSemana) * 100}%`, opacity: s.ini === inicioDaSemana(hoje) ? 1 : 0.65 }} />
                <small>{s.ini.slice(8)}/{s.ini.slice(5, 7)}</small>
              </div>
            ))}
          </div>
        </section>
      </div>

      {fatias.length > 0 && (
        <section className="painel" style={{ marginBottom: 20 }} aria-label="Tempo estudado contra o peso">
          <div className="painel-cabecalho"><h2>Tempo estudado contra o peso</h2><p>Mostra se você está dedicando às disciplinas a fatia que o peso pede.</p></div>
          <div className="tabela-rolavel">
            <table className="tabela">
              <thead><tr><th scope="col">Disciplina</th><th scope="col" className="num">Estudado</th><th scope="col">Parte do seu tempo</th><th scope="col" className="num">Deveria ser</th></tr></thead>
              <tbody>
                {fatias.map((f) => {
                  const real = totalHoras ? f.horasTotaisEstudadas / totalHoras : 0;
                  const diff = real - f.fracao;
                  return (
                    <tr key={f.disciplina.id}>
                      <td><span className="nome-disc"><i className="pontinho" style={{ background: f.disciplina.cor }} />{f.disciplina.nome}</span></td>
                      <td className="num">{formatarHoras(f.horasTotaisEstudadas)}</td>
                      <td>
                        <div className="progresso-dupla">
                          <div className="linha"><span>{Math.round(real * 100)}%</span>
                            {totalHoras > 0 && Math.abs(diff) >= 0.05 && <span className={diff < 0 ? "situacao-falta" : "situacao-ok"}>{diff < 0 ? "abaixo do peso" : "acima do peso"}</span>}
                          </div>
                          <div className="barra"><span style={{ width: `${real * 100}%`, background: f.disciplina.cor }} /></div>
                        </div>
                      </td>
                      <td className="num">{Math.round(f.fracao * 100)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="painel" aria-label="Sessões de estudo">
        <div className="painel-cabecalho">
          <h2>Sessões registradas</h2>
          <select aria-label="Filtrar por disciplina" value={filtro} onChange={(e) => { setFiltro(e.target.value); setLimite(15); }} style={{ width: "auto", minWidth: 200 }}>
            <option value="">Todas as disciplinas</option>
            {concurso.disciplinas.map((d) => <option key={d.id} value={d.id}>{d.nome}</option>)}
          </select>
        </div>
        {lista.length === 0 ? (
          <div className="vazio pequeno">Nenhuma sessão registrada ainda. Registre pela tela “Estudar agora”.</div>
        ) : (
          <>
            <div className="lista-registros">
              {lista.slice(0, limite).map((r) => <RegistroLinha key={r.id} registro={r} concurso={concurso} mostrarData onExcluir={() => removerRegistro(r.id)} />)}
            </div>
            {lista.length > limite && <button className="btn" style={{ marginTop: 12 }} onClick={() => setLimite(limite + 20)}>Mostrar mais ({lista.length - limite})</button>}
          </>
        )}
      </section>
    </>
  );
}
