import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDados } from "../context/DadosContext";
import { useConcursoAtual } from "../hooks/useConcursoAtual";
import { calcularDistribuicao, semanasAteProva, type ModoDistribuicao } from "../utils/estatisticas";
import { formatarHoras, formatarMinutos } from "../utils/datas";

/** Campo numérico que só grava no banco ao terminar de editar. */
function NumeroEditavel({ valor, onSalvar, min = 0, max, passo = 0.5, rotulo }: {
  valor: number; onSalvar: (v: number) => void; min?: number; max: number; passo?: number; rotulo: string;
}) {
  const [texto, setTexto] = useState(String(valor));
  const confirmar = () => {
    const n = Number(texto.replace(",", "."));
    if (Number.isFinite(n)) {
      const limitado = Math.min(max, Math.max(min, n));
      if (limitado !== valor) onSalvar(limitado);
      setTexto(String(limitado));
    } else setTexto(String(valor));
  };
  return (
    <input
      type="number" inputMode="decimal" aria-label={rotulo} min={min} max={max} step={passo}
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
      onBlur={confirmar}
      onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
    />
  );
}

export function Pesos() {
  const { concurso, registros } = useConcursoAtual();
  const { atualizarDisciplina, atualizarConcurso } = useDados();
  const [modo, setModo] = useState<ModoDistribuicao>("peso");

  const fatias = useMemo(() => calcularDistribuicao(concurso, registros, modo), [concurso, registros, modo]);
  const semanas = semanasAteProva(concurso.dataProva);
  const totalSemana = fatias.reduce((s, f) => s + f.horasEstudadasSemana, 0);
  const somaPesos = concurso.disciplinas.reduce((s, x) => s + x.peso, 0);
  const ordenadas = [...fatias].sort((a, b) => b.fracao - a.fracao);

  if (concurso.disciplinas.length === 0) {
    return (
      <>
        <div className="pagina-cabecalho"><div><h1>Pesos e metas</h1></div></div>
        <div className="vazio">
          <strong>Cadastre as disciplinas primeiro</strong>
          <span>Com as disciplinas e seus pesos, o app divide suas horas de estudo na proporção certa.</span>
          <Link className="btn principal" to="../edital">Ir para o edital</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pagina-cabecalho">
        <div>
          <h1>Pesos e metas</h1>
          <p>Veja quanto cada disciplina vale e quantas horas por semana ela merece. Mude o peso ou a meta e tudo se recalcula.</p>
        </div>
        <div className="segmentado" role="group" aria-label="Como dividir o tempo">
          <button aria-pressed={modo === "peso"} onClick={() => setModo("peso")}>Só pelo peso</button>
          <button aria-pressed={modo === "ajustado"} onClick={() => setModo("ajustado")}>Peso e o que falta estudar</button>
        </div>
      </div>

      <div className="metricas">
        <div className="metrica">
          <div className="rotulo">Meta semanal</div>
          <div className="valor" style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
            <span style={{ width: 90 }}>
              <NumeroEditavel key={concurso.metaHorasSemana} valor={concurso.metaHorasSemana} max={168} rotulo="Meta de horas por semana" onSalvar={(v) => atualizarConcurso(concurso.id, { metaHorasSemana: v })} />
            </span>
            <span style={{ fontSize: "1rem", fontWeight: 600 }}>h por semana</span>
          </div>
        </div>
        <div className="metrica">
          <div className="rotulo">Estudado nos últimos 7 dias</div>
          <div className="valor">{formatarHoras(totalSemana)}</div>
          <div className="detalhe">{concurso.metaHorasSemana ? `${Math.round((totalSemana / concurso.metaHorasSemana) * 100)}% da meta` : "defina uma meta"}</div>
        </div>
        <div className="metrica">
          <div className="rotulo">Semanas até a prova</div>
          <div className="valor">{semanas === null ? "—" : Math.floor(semanas)}</div>
          <div className="detalhe">{semanas === null ? "informe a data da prova" : `${formatarHoras(semanas * concurso.metaHorasSemana)} no ritmo da meta`}</div>
        </div>
      </div>

      <section className="painel" aria-labelledby="titulo-faixa">
        <div className="painel-cabecalho">
          <div>
            <h2 id="titulo-faixa">Como seu tempo se divide</h2>
            <p>{modo === "peso" ? "Cada fatia é proporcional ao peso da disciplina." : "O peso é reduzido conforme você conclui o conteúdo, mas nunca chega a zero."}</p>
          </div>
        </div>
        <div className="faixa-pesos" role="img" aria-label={ordenadas.map((f) => `${f.disciplina.nome} ${Math.round(f.fracao * 100)}%`).join(", ")}>
          {ordenadas.map((f) => (
            <div key={f.disciplina.id} className="fatia" title={`${f.disciplina.nome}: ${Math.round(f.fracao * 100)}%`} style={{ flexGrow: Math.max(f.fracao, 0.0001), flexBasis: 0, background: f.disciplina.cor }}>
              {f.fracao >= 0.06 && <strong>{Math.round(f.fracao * 100)}%</strong>}
              {f.fracao >= 0.1 && <small>{f.disciplina.nome}</small>}
            </div>
          ))}
        </div>
      </section>

      <section className="painel" style={{ marginTop: 20 }} aria-labelledby="titulo-tabela">
        <div className="painel-cabecalho">
          <div>
            <h2 id="titulo-tabela">Quanto estudar de cada disciplina</h2>
            <p>Soma dos pesos: {somaPesos.toLocaleString("pt-BR")}. As horas recomendadas usam a meta semanal de {formatarHoras(concurso.metaHorasSemana)}.</p>
          </div>
        </div>
        <div className="tabela-rolavel">
          <table className="tabela">
            <thead>
              <tr>
                <th scope="col">Disciplina</th>
                <th scope="col" className="num">Peso</th>
                <th scope="col" className="num">Participação</th>
                <th scope="col" className="num">Meta por semana</th>
                <th scope="col">Últimos 7 dias</th>
                <th scope="col" className="num">Até a prova</th>
                <th scope="col">Edital</th>
              </tr>
            </thead>
            <tbody>
              {ordenadas.map((f) => {
                const meta = f.horasSemana;
                const falta = meta - f.horasEstudadasSemana;
                const pct = meta > 0 ? Math.min(100, Math.round((f.horasEstudadasSemana / meta) * 100)) : 0;
                return (
                  <tr key={f.disciplina.id}>
                    <td>
                      <span className="nome-disc"><i className="pontinho" style={{ background: f.disciplina.cor }} />{f.disciplina.nome}</span>
                    </td>
                    <td className="num">
                      <NumeroEditavel key={f.disciplina.peso} valor={f.disciplina.peso} max={1000} rotulo={`Peso de ${f.disciplina.nome}`} onSalvar={(v) => atualizarDisciplina(f.disciplina.id, { peso: v })} />
                    </td>
                    <td className="num"><strong>{(f.fracao * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%</strong></td>
                    <td className="num">
                      <strong>{formatarHoras(meta)}</strong>
                      <div className="fraco">≈ {formatarMinutos((meta * 60) / 7)} por dia</div>
                    </td>
                    <td>
                      <div className="progresso-dupla">
                        <div className="linha">
                          <span>{formatarHoras(f.horasEstudadasSemana)} de {formatarHoras(meta)}</span>
                          {meta > 0 && (falta > 0.05
                            ? <span className="situacao-falta">faltam {formatarHoras(falta)}</span>
                            : <span className="situacao-ok">meta batida</span>)}
                        </div>
                        <div className={`barra${pct >= 100 ? " ok" : ""}`}><span style={{ width: `${pct}%` }} /></div>
                      </div>
                    </td>
                    <td className="num">{semanas === null ? "—" : formatarHoras(f.horasAteProva)}</td>
                    <td>
                      <div className="progresso-dupla" style={{ minWidth: 110 }}>
                        <div className="linha"><span>{f.contagem.concluidos}/{f.contagem.total}</span><span>{f.contagem.percentual}%</span></div>
                        <div className="barra ok"><span style={{ width: `${f.contagem.percentual}%` }} /></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
