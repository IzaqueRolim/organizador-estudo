import type { Concurso, Conteudo, Disciplina } from "../types/concurso";

export const contarConteudos = (conteudos: Conteudo[]): number =>
  conteudos.reduce(
    (total, conteudo) => total + 1 + contarConteudos(conteudo.filhos),
    0,
  );

export const contarConcluidos = (conteudos: Conteudo[]): number =>
  conteudos.reduce(
    (total, conteudo) =>
      total +
      (conteudo.status === "concluido" ? 1 : 0) +
      contarConcluidos(conteudo.filhos),
    0,
  );

export const listarConteudos = (conteudos: Conteudo[]): Conteudo[] =>
  conteudos.flatMap((conteudo) => [
    conteudo,
    ...listarConteudos(conteudo.filhos),
  ]);

export const encontrarDisciplina = (
  disciplinas: Disciplina[],
  disciplinaId?: string,
) => disciplinas.find((disciplina) => disciplina.id === disciplinaId);

export const encontrarConteudo = (
  disciplinas: Disciplina[],
  conteudoId?: string,
) => {
  if (!conteudoId) {
    return undefined;
  }

  for (const disciplina of disciplinas) {
    const conteudo = listarConteudos(disciplina.conteudos).find(
      (item) => item.id === conteudoId,
    );

    if (conteudo) {
      return conteudo;
    }
  }

  return undefined;
};

export const totalConteudosConcurso = (concurso: Concurso) =>
  concurso.disciplinas.reduce(
    (total, disciplina) => total + contarConteudos(disciplina.conteudos),
    0,
  );

export const totalConcluidosConcurso = (concurso: Concurso) =>
  concurso.disciplinas.reduce(
    (total, disciplina) => total + contarConcluidos(disciplina.conteudos),
    0,
  );

export const progressoConcurso = (concurso: Concurso) => {
  const total = totalConteudosConcurso(concurso);
  const concluidos = totalConcluidosConcurso(concurso);

  return total > 0 ? Math.round((concluidos / total) * 100) : 0;
};

export const calcularDiasAteProva = (dataProva: string) => {
  if (!dataProva) {
    return null;
  }

  const hoje = new Date();
  const prova = new Date(`${dataProva}T00:00:00`);
  const diff = prova.getTime() - hoje.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const formatarData = (data: string) => {
  if (!data) {
    return "Nao definida";
  }

  return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
};

export const dataLocalIso = (offsetDias = 0) => {
  const data = new Date();
  data.setDate(data.getDate() + offsetDias);

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
};

export const formatarMinutos = (minutos: number) => {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;

  if (horas === 0) {
    return `${resto} min`;
  }

  if (resto === 0) {
    return `${horas}h`;
  }

  return `${horas}h ${resto}min`;
};

export const ordenarCronogramaPorDataHora = <T extends { data?: string; horario?: string }>(
  itens: T[],
) =>
  [...itens].sort((a, b) => {
    const dataA = a.data || "";
    const dataB = b.data || "";
    const horarioA = a.horario || "";
    const horarioB = b.horario || "";
    const comparacaoData = dataA.localeCompare(dataB);

    if (comparacaoData !== 0) {
      return comparacaoData;
    }

    return horarioA.localeCompare(horarioB);
  });
