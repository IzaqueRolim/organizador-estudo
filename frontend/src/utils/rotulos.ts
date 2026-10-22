import type { Atividade, ConteudoStatus } from "../types";

export const nomeAtividade: Record<Atividade, string> = {
  aula: "Vi aula",
  questoes: "Fiz questões",
  revisao: "Revisei",
  leitura: "Li material",
  resumo: "Fiz resumo",
  simulado: "Fiz simulado",
};

export const nomeStatus: Record<ConteudoStatus, string> = {
  pendente: "Pendente",
  em_estudo: "Em estudo",
  concluido: "Concluído",
};
