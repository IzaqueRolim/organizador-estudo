import { useConcurso } from "../hooks/useConcurso";
import type { Disciplina } from "../types/concurso";

interface PesoSliderProps {
  disciplina: Disciplina;
  totalPeso: number;
}

export function PesoSlider({ disciplina, totalPeso }: PesoSliderProps) {
  const { updatePeso } = useConcurso();
  const percentual =
    totalPeso > 0 ? Math.round((disciplina.peso / totalPeso) * 100) : 0;

  return (
    <div className="pesoSlider">
      <div>
        <strong>{disciplina.nome}</strong>
        <span>{percentual}% da prioridade</span>
      </div>

      <input
        type="range"
        min={0}
        max={10}
        step={0.5}
        value={disciplina.peso}
        onChange={(event) => updatePeso(disciplina.id, Number(event.target.value))}
      />

      <input
        aria-label={`Peso de ${disciplina.nome}`}
        type="number"
        min={0}
        max={10}
        step={0.5}
        value={disciplina.peso}
        onChange={(event) => updatePeso(disciplina.id, Number(event.target.value))}
      />
    </div>
  );
}
