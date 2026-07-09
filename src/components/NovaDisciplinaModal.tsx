import { useState, type FormEvent } from "react";
import { useConcurso } from "../hooks/useConcurso";

interface NovaDisciplinaModalProps {
  open: boolean;
  onClose: () => void;
}

const cores = ["#1769aa", "#1f9d76", "#c77d00", "#8a4fff", "#d64550"];

export function NovaDisciplinaModal({ open, onClose }: NovaDisciplinaModalProps) {
  const { addDisciplina } = useConcurso();
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState(1);
  const [cor, setCor] = useState(cores[0]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addDisciplina({ nome, peso, cor });
    setNome("");
    setPeso(1);
    setCor(cores[0]);
    onClose();
  };

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <form className="modalPanel" onSubmit={handleSubmit}>
        <div className="modalHeader">
          <div>
            <h2>Nova disciplina</h2>
            <p>Crie uma area do edital para organizar conteudos.</p>
          </div>
          <button type="button" className="iconButton" onClick={onClose}>
            Fechar
          </button>
        </div>

        <label>
          Nome
          <input
            required
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex.: Direito Constitucional"
          />
        </label>

        <label>
          Peso inicial
          <input
            min={0}
            max={10}
            step={0.5}
            type="number"
            value={peso}
            onChange={(event) => setPeso(Number(event.target.value))}
          />
        </label>

        <fieldset className="colorField">
          <legend>Cor</legend>
          <div>
            {cores.map((item) => (
              <button
                key={item}
                type="button"
                className={cor === item ? "colorSwatch selected" : "colorSwatch"}
                style={{ backgroundColor: item }}
                aria-label={`Selecionar cor ${item}`}
                onClick={() => setCor(item)}
              />
            ))}
          </div>
        </fieldset>

        <div className="formActions">
          <button type="submit" className="primaryButton">
            Criar disciplina
          </button>
          <button type="button" className="ghostButton" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
