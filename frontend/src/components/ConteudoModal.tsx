import { useState } from "react";
import { Modal } from "./Modal";

const DIVISORES = [
  { valor: "\n", nome: "Uma linha por conteúdo" },
  { valor: ";", nome: "Ponto e vírgula ( ; )" },
  { valor: "|", nome: "Barra vertical ( | )" },
  { valor: ",", nome: "Vírgula ( , )" },
];

interface AdicionarProps {
  contexto: string;
  onAdicionar: (titulos: string[]) => void;
  onFechar: () => void;
}

/** Adiciona um ou vários conteúdos de uma vez (cole o trecho do edital). */
export function AdicionarConteudosModal({ contexto, onAdicionar, onFechar }: AdicionarProps) {
  const [texto, setTexto] = useState("");
  const [divisor, setDivisor] = useState("\n");

  const itens = texto
    .split(divisor)
    .map((t) => t.replace(/^\s*[-•*\d.)]+\s+/, "").trim())
    .filter(Boolean);

  return (
    <Modal
      larga
      titulo="Adicionar conteúdos"
      descricao={contexto}
      onFechar={onFechar}
      onEnviar={(e) => {
        e.preventDefault();
        if (itens.length) onAdicionar(itens);
      }}
      rodape={
        <>
          <button type="button" className="btn" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="btn principal" disabled={!itens.length}>
            Adicionar {itens.length > 1 ? `${itens.length} conteúdos` : "conteúdo"}
          </button>
        </>
      }
    >
      <label className="campo">
        Como os conteúdos estão separados
        <select value={divisor} onChange={(e) => setDivisor(e.target.value)}>
          {DIVISORES.map((d) => <option key={d.nome} value={d.valor}>{d.nome}</option>)}
        </select>
      </label>
      <label className="campo">
        Conteúdos
        <textarea
          rows={8}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={"Compreensão de textos\nOrtografia oficial\nClasses de palavras"}
        />
      </label>
      {itens.length > 0 && (
        <div>
          <p className="fraco" style={{ marginBottom: 6 }}>Prévia: {itens.length} {itens.length === 1 ? "item" : "itens"}</p>
          <ul className="lista-simples" style={{ maxHeight: 160, overflowY: "auto", border: "1px solid var(--linha)", borderRadius: 6, padding: "0 10px" }}>
            {itens.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}
    </Modal>
  );
}

interface EditarProps {
  titulo: string;
  observacao: string;
  onSalvar: (dados: { titulo: string; observacao: string }) => void;
  onFechar: () => void;
}

export function EditarConteudoModal({ titulo, observacao, onSalvar, onFechar }: EditarProps) {
  const [t, setT] = useState(titulo);
  const [o, setO] = useState(observacao);
  return (
    <Modal
      titulo="Editar conteúdo"
      onFechar={onFechar}
      onEnviar={(e) => {
        e.preventDefault();
        if (t.trim()) onSalvar({ titulo: t.trim(), observacao: o.trim() });
      }}
      rodape={
        <>
          <button type="button" className="btn" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="btn principal">Salvar</button>
        </>
      }
    >
      <label className="campo">
        Título
        <textarea rows={2} required value={t} onChange={(e) => setT(e.target.value)} />
      </label>
      <label className="campo">
        Anotação (opcional)
        <textarea rows={3} value={o} onChange={(e) => setO(e.target.value)} placeholder="Ex.: cai muito na FGV, rever a lista de exceções" />
      </label>
    </Modal>
  );
}
