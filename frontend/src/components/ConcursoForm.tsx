import { useState, type FormEvent, type ReactNode } from "react";
import { NIVEIS, type ConcursoBase, type NivelConcurso } from "../types";

export type DadosFormConcurso = Omit<ConcursoBase, "id">;

export const concursoVazio: DadosFormConcurso = {
  titulo: "",
  orgao: "",
  banca: "",
  cargo: "",
  nivel: "superior",
  vagas: 0,
  salario: 0,
  dataProva: "",
  dataInscricaoInicio: "",
  dataInscricaoFim: "",
  urlEdital: "",
  observacoes: "",
  metaHorasSemana: 20,
};

const nomesNivel: Record<NivelConcurso, string> = {
  fundamental: "Fundamental",
  medio: "Médio",
  tecnico: "Técnico",
  superior: "Superior",
  outro: "Outro",
};

interface Props {
  inicial: DadosFormConcurso;
  rotulo: string;
  onSalvar: (dados: DadosFormConcurso) => void;
  extra?: ReactNode;
}

export function ConcursoForm({ inicial, rotulo, onSalvar, extra }: Props) {
  const [f, setF] = useState<DadosFormConcurso>(inicial);
  const set = <K extends keyof DadosFormConcurso>(chave: K, valor: DadosFormConcurso[K]) =>
    setF((atual) => ({ ...atual, [chave]: valor }));

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    onSalvar({ ...f, titulo: f.titulo.trim() });
  };

  return (
    <form onSubmit={enviar} className="grade-form">
      <label className="campo larga">
        Nome do concurso
        <input required value={f.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="Ex.: Banco do Brasil 2027" />
      </label>
      <label className="campo">
        Órgão
        <input value={f.orgao} onChange={(e) => set("orgao", e.target.value)} />
      </label>
      <label className="campo">
        Banca organizadora
        <input value={f.banca} onChange={(e) => set("banca", e.target.value)} placeholder="Ex.: FGV, Cebraspe" />
      </label>
      <label className="campo">
        Cargo
        <input value={f.cargo} onChange={(e) => set("cargo", e.target.value)} />
      </label>
      <label className="campo">
        Escolaridade
        <select value={f.nivel} onChange={(e) => set("nivel", e.target.value as NivelConcurso)}>
          {NIVEIS.map((n) => <option key={n} value={n}>{nomesNivel[n]}</option>)}
        </select>
      </label>
      <label className="campo">
        Vagas
        <input type="number" min={0} value={f.vagas} onChange={(e) => set("vagas", Math.max(0, Number(e.target.value)))} />
      </label>
      <label className="campo">
        Salário (R$)
        <input type="number" min={0} step="0.01" value={f.salario} onChange={(e) => set("salario", Math.max(0, Number(e.target.value)))} />
      </label>
      <label className="campo">
        Início das inscrições
        <input type="date" value={f.dataInscricaoInicio} onChange={(e) => set("dataInscricaoInicio", e.target.value)} />
      </label>
      <label className="campo">
        Fim das inscrições
        <input type="date" value={f.dataInscricaoFim} onChange={(e) => set("dataInscricaoFim", e.target.value)} />
      </label>
      <label className="campo">
        Data da prova
        <input type="date" value={f.dataProva} onChange={(e) => set("dataProva", e.target.value)} />
      </label>
      <label className="campo">
        Meta de estudo por semana (horas)
        <input type="number" min={0} max={168} step="0.5" value={f.metaHorasSemana} onChange={(e) => set("metaHorasSemana", Math.min(168, Math.max(0, Number(e.target.value))))} />
      </label>
      <label className="campo larga">
        Link do edital
        <input type="url" value={f.urlEdital} onChange={(e) => set("urlEdital", e.target.value)} placeholder="https://" />
      </label>
      <label className="campo larga">
        Observações
        <textarea rows={3} value={f.observacoes} onChange={(e) => set("observacoes", e.target.value)} />
      </label>
      <div className="larga acoes">
        <button type="submit" className="btn principal">{rotulo}</button>
        {extra}
      </div>
    </form>
  );
}
