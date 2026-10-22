import { api } from "./api";
import type {
  ConcursoBase,
  ConteudoRow,
  CronogramaItem,
  Dados,
  DisciplinaRow,
  RegistroEstudo,
} from "../types";

/**
 * Camada de acesso aos dados: fala com a API (NestJS + Postgres/Supabase).
 * A API já usa os mesmos nomes de campo do app, então os "ParaRow" não
 * transformam nada — existem só para manter o contrato com o DadosContext.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

export const concursoParaRow = (c: Partial<ConcursoBase>): Row => c;
export const disciplinaParaRow = (d: Partial<DisciplinaRow>): Row => d;
export const conteudoParaRow = (c: Partial<ConteudoRow>): Row => c;
export const cronogramaParaRow = (c: Partial<CronogramaItem>): Row => c;
export const registroParaRow = (r: Partial<RegistroEstudo>): Row => r;

export type Tabela =
  | "concursos"
  | "disciplinas"
  | "conteudos"
  | "cronograma_itens"
  | "registros_estudo";

const ROTAS: Record<Tabela, string> = {
  concursos: "/concursos",
  disciplinas: "/disciplinas",
  conteudos: "/conteudos",
  cronograma_itens: "/cronograma",
  registros_estudo: "/registros",
};

const LOTE = 2000;

export const carregarTudo = () => api<Dados>("GET", "/dados");

export async function inserir(tabela: Tabela, linhas: Row | Row[]) {
  const lista = Array.isArray(linhas) ? linhas : [linhas];
  for (let i = 0; i < lista.length; i += LOTE) {
    await api("POST", ROTAS[tabela], lista.slice(i, i + LOTE));
  }
}

export async function atualizar(tabela: Tabela, id: string, campos: Row) {
  await api("PATCH", `${ROTAS[tabela]}/${id}`, campos);
}

export async function atualizarVarios(tabela: Tabela, ids: string[], campos: Row) {
  if (tabela !== "conteudos" || typeof campos.status !== "string") {
    throw new Error("Atualização em lote só existe para o status dos conteúdos.");
  }
  for (let i = 0; i < ids.length; i += LOTE) {
    await api("POST", "/conteudos/status", { ids: ids.slice(i, i + LOTE), status: campos.status });
  }
}

export async function remover(tabela: Tabela, id: string) {
  await api("DELETE", `${ROTAS[tabela]}/${id}`);
}

/** Grava um pacote completo (importação) numa única transação no servidor. */
export async function inserirPacote(pacote: Dados) {
  await api("POST", "/importar", pacote);
}
