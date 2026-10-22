import { useState } from "react";
import { Modal } from "./Modal";
import type { Disciplina } from "../types";

export const CORES = ["#2b45e6", "#17803d", "#c2410c", "#7c3aed", "#c4263a", "#0e7490", "#a16207", "#be185d", "#475569", "#0d9488"];

interface Props {
  disciplina?: Disciplina;
  corSugerida?: string;
  onSalvar: (dados: { nome: string; cor: string; peso: number }) => void;
  onFechar: () => void;
}

export function DisciplinaModal({ disciplina, corSugerida, onSalvar, onFechar }: Props) {
  const [nome, setNome] = useState(disciplina?.nome ?? "");
  const [cor, setCor] = useState(disciplina?.cor ?? corSugerida ?? CORES[0]);
  const [peso, setPeso] = useState(disciplina?.peso ?? 1);

  return (
    <Modal
      titulo={disciplina ? "Editar disciplina" : "Nova disciplina"}
      descricao="O peso define quanto do seu tempo semanal a disciplina recebe. Pode ser o peso da prova ou o número de questões."
      onFechar={onFechar}
      onEnviar={(e) => {
        e.preventDefault();
        if (!nome.trim()) return;
        onSalvar({ nome: nome.trim(), cor, peso });
      }}
      rodape={
        <>
          <button type="button" className="btn" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="btn principal">{disciplina ? "Salvar" : "Criar disciplina"}</button>
        </>
      }
    >
      <div className="grade-form">
        <label className="campo larga">
          Nome
          <input required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Língua Portuguesa" />
        </label>
        <label className="campo">
          Peso
          <input type="number" min={0} max={1000} step="0.5" value={peso} onChange={(e) => setPeso(Number(e.target.value))} />
        </label>
        <div className="campo">
          Cor
          <div className="chips" role="radiogroup" aria-label="Cor da disciplina">
            {CORES.map((c) => (
              <label key={c} className="chip-opcao" title={c}>
                <input type="radio" name="cor" checked={cor === c} onChange={() => setCor(c)} />
                <span style={{ padding: 0, width: 30, height: 30, background: c, justifyContent: "center", borderColor: cor === c ? "var(--tinta)" : "transparent", borderWidth: 2 }}>
                  <span className="so-leitor">{c}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
