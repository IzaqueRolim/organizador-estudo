import { useMemo, useState } from "react";
import { Modal } from "./Modal";
import { TIPOS_CRONOGRAMA, type Concurso, type CronogramaItem, type TipoCronograma } from "../types";
import { listarConteudosComCaminho } from "../utils/estatisticas";

export const nomeTipo: Record<TipoCronograma, string> = {
  teoria: "Teoria",
  questoes: "Questões",
  revisao: "Revisão",
  resumo: "Resumo",
  simulado: "Simulado",
  leitura: "Leitura",
};

export type DadosItem = Omit<CronogramaItem, "id" | "concursoId" | "concluido">;

interface Props {
  concurso: Concurso;
  item?: CronogramaItem;
  dataInicial: string;
  onSalvar: (dados: DadosItem) => void;
  onExcluir?: () => void;
  onFechar: () => void;
}

export function ItemPlanoModal({ concurso, item, dataInicial, onSalvar, onExcluir, onFechar }: Props) {
  const [f, setF] = useState<DadosItem>({
    data: item?.data ?? dataInicial,
    horario: item?.horario ?? "19:00",
    duracaoMinutos: item?.duracaoMinutos ?? 60,
    disciplinaId: item?.disciplinaId ?? null,
    conteudoId: item?.conteudoId ?? null,
    titulo: item?.titulo ?? "",
    descricao: item?.descricao ?? "",
    tipo: item?.tipo ?? "teoria",
  });
  const set = <K extends keyof DadosItem>(k: K, v: DadosItem[K]) => setF((a) => ({ ...a, [k]: v }));

  const disciplina = concurso.disciplinas.find((d) => d.id === f.disciplinaId);
  const opcoes = useMemo(() => (disciplina ? listarConteudosComCaminho(disciplina.conteudos) : []), [disciplina]);
  const conteudo = opcoes.find((o) => o.conteudo.id === f.conteudoId)?.conteudo;

  return (
    <Modal
      titulo={item ? "Editar estudo planejado" : "Planejar estudo"}
      descricao="Escolha a disciplina e o conteúdo do edital que você quer estudar neste horário."
      onFechar={onFechar}
      larga
      onEnviar={(e) => {
        e.preventDefault();
        onSalvar({ ...f, titulo: f.titulo.trim() || conteudo?.titulo || disciplina?.nome || nomeTipo[f.tipo] });
      }}
      rodape={
        <>
          {onExcluir && <button type="button" className="btn perigo" style={{ marginRight: "auto" }} onClick={onExcluir}>Excluir</button>}
          <button type="button" className="btn" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="btn principal">{item ? "Salvar" : "Adicionar ao plano"}</button>
        </>
      }
    >
      <div className="grade-form">
        <label className="campo">
          Dia
          <input type="date" required value={f.data} onChange={(e) => set("data", e.target.value)} />
        </label>
        <label className="campo">
          Início
          <input type="time" required value={f.horario} onChange={(e) => set("horario", e.target.value)} />
        </label>
        <label className="campo">
          Duração (minutos)
          <input type="number" min={5} max={1440} step={5} required value={f.duracaoMinutos} onChange={(e) => set("duracaoMinutos", Number(e.target.value))} />
        </label>
        <label className="campo">
          Tipo de estudo
          <select value={f.tipo} onChange={(e) => set("tipo", e.target.value as TipoCronograma)}>
            {TIPOS_CRONOGRAMA.map((t) => <option key={t} value={t}>{nomeTipo[t]}</option>)}
          </select>
        </label>
        <label className="campo">
          Disciplina
          <select value={f.disciplinaId ?? ""} onChange={(e) => setF((a) => ({ ...a, disciplinaId: e.target.value || null, conteudoId: null }))}>
            <option value="">Sem disciplina</option>
            {concurso.disciplinas.map((d) => <option key={d.id} value={d.id}>{d.nome}</option>)}
          </select>
        </label>
        <label className="campo">
          Conteúdo do edital
          <select value={f.conteudoId ?? ""} disabled={!disciplina} onChange={(e) => set("conteudoId", e.target.value || null)}>
            <option value="">{disciplina ? "Qualquer conteúdo da disciplina" : "Escolha a disciplina antes"}</option>
            {opcoes.map((o) => (
              <option key={o.conteudo.id} value={o.conteudo.id}>
                {"  ".repeat(o.nivel)}{o.conteudo.titulo.length > 90 ? o.conteudo.titulo.slice(0, 90) + "…" : o.conteudo.titulo}
              </option>
            ))}
          </select>
        </label>
        <label className="campo larga">
          Título (opcional)
          <input value={f.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder={conteudo?.titulo ?? disciplina?.nome ?? "Ex.: Resolver prova de 2024"} />
        </label>
        <label className="campo larga">
          Detalhes do que fazer
          <textarea rows={3} value={f.descricao} onChange={(e) => set("descricao", e.target.value)} placeholder="Ex.: assistir aula 12 e resolver 30 questões da FGV" />
        </label>
      </div>
    </Modal>
  );
}
