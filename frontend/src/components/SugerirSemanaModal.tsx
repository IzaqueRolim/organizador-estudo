import { useMemo, useState } from "react";
import { Modal } from "./Modal";
import type { Concurso, NovoCronogramaItem, RegistroEstudo } from "../types";
import { calcularDistribuicao, listarConteudos } from "../utils/estatisticas";
import { diaSemanaCurto, diasDaSemana, formatarData, formatarHoras, hojeIso } from "../utils/datas";

interface Props {
  concurso: Concurso;
  registros: RegistroEstudo[];
  inicioSemana: string;
  onCriar: (itens: NovoCronogramaItem[]) => void;
  onFechar: () => void;
}

/**
 * Monta uma semana de estudos a partir dos pesos: reparte a meta semanal entre
 * as disciplinas e distribui os blocos pelos dias escolhidos, sugerindo o
 * próximo conteúdo ainda não concluído de cada uma.
 */
export function SugerirSemanaModal({ concurso, registros, inicioSemana, onCriar, onFechar }: Props) {
  const dias = diasDaSemana(inicioSemana);
  const hoje = hojeIso();
  // dias que já passaram não entram: o plano só olha para frente
  const [diasEscolhidos, setDiasEscolhidos] = useState<Set<string>>(new Set(dias.filter((d) => d >= hoje).slice(0, 6)));
  const [horas, setHoras] = useState(concurso.metaHorasSemana);
  const [bloco, setBloco] = useState(60);
  const [inicio, setInicio] = useState("19:00");

  const itens = useMemo<NovoCronogramaItem[]>(() => {
    const dd = dias.filter((d) => diasEscolhidos.has(d));
    if (!dd.length || horas <= 0) return [];
    const base = calcularDistribuicao({ ...concurso, metaHorasSemana: horas }, registros, "peso").filter((f) => f.horasSemana > 0);
    // quantos blocos cada disciplina recebe (maior resto primeiro, até fechar o total)
    const totalBlocos = Math.max(1, Math.round((horas * 60) / bloco));
    const brutos = base.map((f) => ({ f, exato: f.fracao * totalBlocos }));
    const blocos = brutos.map((b) => ({ ...b, n: Math.floor(b.exato) }));
    let faltam = totalBlocos - blocos.reduce((s, b) => s + b.n, 0);
    [...blocos].sort((a, b) => b.exato - b.n - (a.exato - a.n)).forEach((b) => {
      if (faltam > 0) { b.n++; faltam--; }
    });

    // fila intercalada (round-robin) para não repetir a mesma disciplina no mesmo dia
    const filas = blocos.filter((b) => b.n > 0).map((b) => ({ ...b, restante: b.n, pendentes: listarConteudos(b.f.disciplina.conteudos).filter((c) => c.status !== "concluido") , usados: 0 }));
    const sequencia: typeof filas = [];
    while (filas.some((x) => x.restante > 0)) {
      filas.forEach((x) => { if (x.restante > 0) { sequencia.push({ ...x }); x.restante--; } });
    }
    const resultado: NovoCronogramaItem[] = [];
    const usoPorDisciplina = new Map<string, number>();
    const contagemDia = new Map<string, number>();
    sequencia.forEach((s, i) => {
      const dia = dd[i % dd.length];
      const idx = contagemDia.get(dia) ?? 0;
      contagemDia.set(dia, idx + 1);
      const [h, m] = inicio.split(":").map(Number);
      const minutosIni = h * 60 + m + idx * (bloco + 10);
      const horario = `${String(Math.floor(minutosIni / 60) % 24).padStart(2, "0")}:${String(minutosIni % 60).padStart(2, "0")}`;
      const usados = usoPorDisciplina.get(s.f.disciplina.id) ?? 0;
      usoPorDisciplina.set(s.f.disciplina.id, usados + 1);
      const conteudo = s.pendentes.length ? s.pendentes[usados % s.pendentes.length] : undefined;
      resultado.push({
        data: dia,
        horario,
        duracaoMinutos: bloco,
        disciplinaId: s.f.disciplina.id,
        conteudoId: conteudo?.id ?? null,
        titulo: conteudo?.titulo ?? s.f.disciplina.nome,
        descricao: "",
        tipo: "teoria",
      });
    });
    return resultado;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concurso, registros, diasEscolhidos, horas, bloco, inicio]);

  return (
    <Modal
      larga
      titulo="Montar a semana pelos pesos"
      descricao={`Semana de ${formatarData(dias[0], { day: "2-digit", month: "2-digit" })} a ${formatarData(dias[6], { day: "2-digit", month: "2-digit" })}. Você pode ajustar cada bloco depois.`}
      onFechar={onFechar}
      onEnviar={(e) => {
        e.preventDefault();
        if (itens.length) onCriar(itens);
      }}
      rodape={
        <>
          <button type="button" className="btn" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="btn principal" disabled={!itens.length}>Criar {itens.length} blocos</button>
        </>
      }
    >
      <div className="grade-form">
        <label className="campo">Horas na semana
          <input type="number" min={1} max={100} step="0.5" value={horas} onChange={(e) => setHoras(Number(e.target.value))} />
        </label>
        <label className="campo">Tamanho de cada bloco
          <select value={bloco} onChange={(e) => setBloco(Number(e.target.value))}>
            {[30, 45, 60, 90, 120].map((m) => <option key={m} value={m}>{m} minutos</option>)}
          </select>
        </label>
        <label className="campo">Começar às
          <input type="time" value={inicio} onChange={(e) => setInicio(e.target.value)} />
        </label>
      </div>
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="fraco" style={{ marginBottom: 6, fontWeight: 600 }}>Dias de estudo</legend>
        <div className="chips">
          {dias.map((d) => (
            <label key={d} className="chip-opcao">
              <input type="checkbox" disabled={d < hoje} checked={diasEscolhidos.has(d)} onChange={() => {
                const novo = new Set(diasEscolhidos);
                if (novo.has(d)) novo.delete(d); else novo.add(d);
                setDiasEscolhidos(novo);
              }} />
              <span style={{ textTransform: "capitalize" }}>{diaSemanaCurto(d)} {d.slice(8)}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {itens.length === 0 ? (
        <p className="erro-form">Escolha ao menos um dia que ainda não passou e confira se as disciplinas têm peso maior que zero.</p>
      ) : (
        <div className="tabela-rolavel" style={{ maxHeight: 260, overflowY: "auto" }}>
          <table className="tabela">
            <thead><tr><th>Dia</th><th>Hora</th><th>Disciplina</th><th>Conteúdo</th></tr></thead>
            <tbody>
              {[...itens].sort((a, b) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario)).map((i, k) => {
                const d = concurso.disciplinas.find((x) => x.id === i.disciplinaId);
                return (
                  <tr key={k}>
                    <td style={{ textTransform: "capitalize" }}>{diaSemanaCurto(i.data)} {i.data.slice(8)}</td>
                    <td className="num">{i.horario}</td>
                    <td><span className="nome-disc" style={{ minWidth: 0 }}><i className="pontinho" style={{ background: d?.cor }} />{d?.nome}</span></td>
                    <td className="suave">{i.titulo === d?.nome ? "—" : i.titulo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="fraco">Total planejado: {formatarHoras((itens.length * bloco) / 60)} divididas conforme o peso de cada disciplina.</p>
    </Modal>
  );
}
