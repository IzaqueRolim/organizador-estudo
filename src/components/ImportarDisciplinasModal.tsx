import { useState } from "react";
import { useConcurso } from "../hooks/useConcurso";

interface ImportarConteudosModalProps {
  open: boolean;
  onClose: () => void;
}

const cores = ["#1769aa", "#1f9d76", "#c77d00", "#8a4fff", "#d64550"];

export function ImportarDisciplinasModal({ open, onClose }: ImportarConteudosModalProps) {
  const { addDisciplina, addConteudo } = useConcurso();
  const [nomeDisciplina, setNomeDisciplina] = useState("");
  const [cor, setCor] = useState(cores[0]);
  const [texto, setTexto] = useState("");
  const [divisor, setDivisor] = useState(";");
  const [conteudosPreview, setConteudosPreview] = useState<string[]>([]);
  const [etapa, setEtapa] = useState<"input" | "preview">("input");

  if (!open) {
    return null;
  }

  const extrairConteudos = (texto: string, divisor: string): string[] => {
    return texto
      .split(divisor)
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
  };

  const handleAnalisar = () => {
    if (!nomeDisciplina.trim()) {
      alert("Defina o nome da disciplina.");
      return;
    }
    const conteudos = extrairConteudos(texto, divisor);
    if (conteudos.length === 0) {
      alert("Nenhum conteúdo encontrado. Verifique o texto e o divisor.");
      return;
    }
    setConteudosPreview(conteudos);
    setEtapa("preview");
  };

  const handleImportar = () => {
    const novaDisciplina = addDisciplina({
      nome: nomeDisciplina,
      peso: 1,
      cor,
    });

    if (novaDisciplina) {
      conteudosPreview.forEach((titulo) => {
        addConteudo(novaDisciplina.id, {
          titulo,
          status: "pendente",
        });
      });
    }

    setNomeDisciplina("");
    setCor(cores[0]);
    setTexto("");
    setDivisor(";");
    setConteudosPreview([]);
    setEtapa("input");
    onClose();
  };

  const handleVoltar = () => {
    setEtapa("input");
  };

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <form className="modalPanel" onSubmit={(e) => e.preventDefault()}>
        <div className="modalHeader">
          <div>
            <h2>
              {etapa === "input"
                ? "Criar disciplina e importar conteúdos"
                : "Revisar conteúdos"}
            </h2>
            <p>
              {etapa === "input"
                ? "Defina a disciplina e importe seus conteúdos em lote."
                : "Verifique os conteúdos que serão criados."}
            </p>
          </div>
          <button type="button" className="iconButton" onClick={onClose}>
            Fechar
          </button>
        </div>

        {etapa === "input" ? (
          <>
            <label>
              Nome da Disciplina
              <input
                required
                value={nomeDisciplina}
                onChange={(e) => setNomeDisciplina(e.target.value)}
                placeholder="Ex.: Direito Constitucional"
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

            <label>
              Divisor dos Conteúdos
              <select value={divisor} onChange={(e) => setDivisor(e.target.value)}>
                <option value=";">Ponto e vírgula (;)</option>
                <option value="-">Hífen (-)</option>
                <option value=",">,Vírgula (,)</option>
                <option value="|">Barra vertical (|)</option>
                <option value="/"> Barra (/)</option>
                <option value="\n">Quebra de linha</option>
                <option value=".">Ponto final(.)</option>
              </select>
            </label>

            <label>
              Conteúdos
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Ex.: Constituição Federal; Emendas Constitucionais; Princípios Constitucionais"
                rows={8}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  background: "#0f172a",
                  color: "#e2e8f0",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </label>

            <div className="formActions">
              <button
                type="button"
                className="primaryButton"
                onClick={handleAnalisar}
              >
                Analisar e revisar
              </button>
              <button type="button" className="ghostButton" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                marginBottom: "16px",
                padding: "12px",
                background: "#1e293b",
                borderRadius: "8px",
                borderLeft: `4px solid ${cor}`,
              }}
            >
              <strong style={{ fontSize: "16px",color:"white" }}>{nomeDisciplina}</strong>
            </div>

            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid #334155",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "16px",
                background: "#0f172a",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {conteudosPreview.map((conteudo, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      background: "#1e293b",
                      borderRadius: "6px",
                      borderLeft: `4px solid ${cor}`,
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                        background: "#334155",
                        borderRadius: "50%",
                        fontSize: "12px",
                        fontWeight: "600",
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </span>
                    <span style={{ flex: 1,color:"white" }}>{conteudo}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p style={{ fontSize: "14px", color: "#cbd5e1", marginBottom: "16px" }}>
              Total: <strong>{conteudosPreview.length}</strong> conteúdo
              {conteudosPreview.length !== 1 ? "s" : ""} será
              {conteudosPreview.length !== 1 ? "ão" : "á"} criado
              {conteudosPreview.length !== 1 ? "s" : ""}
            </p>

            <div className="formActions">
              <button
                type="button"
                className="primaryButton"
                onClick={handleImportar}
              >
                Criar disciplina e importar
              </button>
              <button type="button" className="ghostButton" onClick={handleVoltar}>
                Voltar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
