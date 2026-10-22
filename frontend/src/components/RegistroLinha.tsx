import type { Concurso, RegistroEstudo } from "../types";
import { nomeAtividade } from "../utils/rotulos";
import { encontrarConteudoPorId } from "../utils/estatisticas";
import { formatarData, formatarMinutos } from "../utils/datas";

interface Props {
  registro: RegistroEstudo;
  concurso: Concurso;
  mostrarData?: boolean;
  onExcluir: () => void;
}

export function RegistroLinha({ registro: r, concurso, mostrarData, onExcluir }: Props) {
  const disc = concurso.disciplinas.find((d) => d.id === r.disciplinaId);
  const cont = encontrarConteudoPorId(concurso, r.conteudoId);
  return (
    <div className="registro">
      <div className="tempo-reg">
        {formatarMinutos(r.minutos)}
        {mostrarData && <small>{formatarData(r.data, { day: "2-digit", month: "2-digit" })}</small>}
      </div>
      <div className="corpo">
        <strong style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {disc && <i className="pontinho" style={{ background: disc.cor }} />}
          {disc?.nome ?? "Sem disciplina"}
        </strong>
        {cont && <div className="suave" style={{ fontSize: "0.88rem" }}>{cont.titulo}</div>}
        {r.anotacao && <p>{r.anotacao}</p>}
        <div className="marcas">
          {r.atividades.map((a) => <span key={a} className="selo caneta">{nomeAtividade[a]}</span>)}
          {r.questoesFeitas > 0 && (
            <span className="selo">{r.questoesAcertos}/{r.questoesFeitas} questões · {Math.round((r.questoesAcertos / r.questoesFeitas) * 100)}%</span>
          )}
          {r.foco && <span className="selo">foco {r.foco}/5</span>}
        </div>
      </div>
      <button
        className="btn pequeno fantasma perigo"
        onClick={() => { if (window.confirm("Excluir este registro de estudo?")) onExcluir(); }}
        aria-label="Excluir registro"
      >
        Excluir
      </button>
    </div>
  );
}
