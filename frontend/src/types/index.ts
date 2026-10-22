export const CONTEUDO_STATUS = ["pendente", "em_estudo", "concluido"] as const;
export type ConteudoStatus = (typeof CONTEUDO_STATUS)[number];

export const NIVEIS = ["fundamental", "medio", "tecnico", "superior", "outro"] as const;
export type NivelConcurso = (typeof NIVEIS)[number];

export const TIPOS_CRONOGRAMA = [
  "teoria",
  "questoes",
  "revisao",
  "resumo",
  "simulado",
  "leitura",
] as const;
export type TipoCronograma = (typeof TIPOS_CRONOGRAMA)[number];

export const ATIVIDADES = [
  "aula",
  "questoes",
  "revisao",
  "leitura",
  "resumo",
  "simulado",
] as const;
export type Atividade = (typeof ATIVIDADES)[number];

/** Datas são sempre "YYYY-MM-DD"; horários "HH:MM". */

export interface Conteudo {
  id: string;
  disciplinaId: string;
  parentId: string | null;
  titulo: string;
  observacao: string;
  status: ConteudoStatus;
  ordem: number;
  filhos: Conteudo[];
}

export interface Disciplina {
  id: string;
  concursoId: string;
  nome: string;
  cor: string;
  peso: number;
  ordem: number;
  conteudos: Conteudo[];
}

export interface ConcursoBase {
  id: string;
  titulo: string;
  orgao: string;
  banca: string;
  cargo: string;
  nivel: NivelConcurso;
  vagas: number;
  salario: number;
  dataProva: string;
  dataInscricaoInicio: string;
  dataInscricaoFim: string;
  urlEdital: string;
  observacoes: string;
  metaHorasSemana: number;
}

export interface Concurso extends ConcursoBase {
  disciplinas: Disciplina[];
}

export interface CronogramaItem {
  id: string;
  concursoId: string;
  disciplinaId: string | null;
  conteudoId: string | null;
  data: string;
  horario: string;
  duracaoMinutos: number;
  titulo: string;
  descricao: string;
  tipo: TipoCronograma;
  concluido: boolean;
}

export interface RegistroEstudo {
  id: string;
  concursoId: string;
  disciplinaId: string | null;
  conteudoId: string | null;
  cronogramaItemId: string | null;
  data: string;
  minutos: number;
  atividades: Atividade[];
  questoesFeitas: number;
  questoesAcertos: number;
  foco: number | null;
  anotacao: string;
  iniciadoEm: string | null;
  criadoEm: string;
}

/** Linhas planas, como ficam guardadas no estado e no banco. */
export interface ConteudoRow {
  id: string;
  concursoId: string;
  disciplinaId: string;
  parentId: string | null;
  titulo: string;
  observacao: string;
  status: ConteudoStatus;
  ordem: number;
}

export interface DisciplinaRow {
  id: string;
  concursoId: string;
  nome: string;
  cor: string;
  peso: number;
  ordem: number;
}

export interface Dados {
  concursos: ConcursoBase[];
  disciplinas: DisciplinaRow[];
  conteudos: ConteudoRow[];
  cronograma: CronogramaItem[];
  registros: RegistroEstudo[];
}

export const dadosVazios = (): Dados => ({
  concursos: [],
  disciplinas: [],
  conteudos: [],
  cronograma: [],
  registros: [],
});

export type NovoConcurso = Partial<Omit<ConcursoBase, "id">>;
export type NovaDisciplina = { nome: string; cor: string; peso: number };
export type NovoConteudo = {
  titulo: string;
  observacao?: string;
  status?: ConteudoStatus;
};
export type NovoCronogramaItem = Omit<CronogramaItem, "id" | "concursoId" | "concluido"> & {
  concluido?: boolean;
};
export type NovoRegistroEstudo = Omit<RegistroEstudo, "id" | "concursoId" | "criadoEm">;
