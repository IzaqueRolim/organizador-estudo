export const CONTEUDO_STATUS = ["pendente", "em_estudo", "concluido"] as const;

export type ConteudoStatus = (typeof CONTEUDO_STATUS)[number];

export type NivelConcurso =
  | "fundamental"
  | "medio"
  | "tecnico"
  | "superior"
  | "outro";

export interface Conteudo {
  id: string;
  titulo: string;
  observacao?: string;
  status: ConteudoStatus;
  filhos: Conteudo[];
  criadoEm: string;
  atualizadoEm: string;
}

export interface Disciplina {
  id: string;
  nome: string;
  cor: string;
  peso: number;
  conteudos: Conteudo[];
  criadoEm: string;
  atualizadoEm: string;
}

export interface Concurso {
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
  urlEdital?: string;
  observacoes?: string;
  disciplinas: Disciplina[];
  criadoEm: string;
  atualizadoEm: string;
}

export type DiaSemana =
  | "segunda"
  | "terca"
  | "quarta"
  | "quinta"
  | "sexta"
  | "sabado"
  | "domingo";

export interface CronogramaItem {
  id: string;
  concursoId: string;
  dia: DiaSemana;
  horario: string;
  duracaoMinutos: number;
  disciplinaId?: string;
  conteudoId?: string;
  titulo: string;
  concluido: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface RegistroEstudo {
  id: string;
  concursoId: string;
  disciplinaId?: string;
  conteudoId?: string;
  data: string;
  minutos: number;
  anotacao?: string;
  criadoEm: string;
}

export interface AppConcursoState {
  concursos: Concurso[];
  concursoIdAtivo: string;
  cronograma: CronogramaItem[];
  registrosEstudo: RegistroEstudo[];
}

export type ConcursoDraft = Omit<
  Concurso,
  "id" | "disciplinas" | "criadoEm" | "atualizadoEm"
>;

export type NovaDisciplina = Pick<Disciplina, "nome" | "cor" | "peso">;

export type NovoConteudo = Pick<Conteudo, "titulo" | "observacao" | "status">;

export type NovoCronogramaItem = Omit<
  CronogramaItem,
  "id" | "concursoId" | "concluido" | "criadoEm" | "atualizadoEm"
>;

export type NovoRegistroEstudo = Omit<
  RegistroEstudo,
  "id" | "concursoId" | "criadoEm"
>;

export interface ConcursoContextValue {
  concursos: Concurso[];
  concurso: Concurso;
  concursoIdAtivo: string;
  cronograma: CronogramaItem[];
  registrosEstudo: RegistroEstudo[];
  criarConcurso: (dados?: Partial<ConcursoDraft>) => string;
  selecionarConcurso: (concursoId: string) => void;
  removeConcurso: (concursoId: string) => void;
  updateConcurso: (dados: Partial<ConcursoDraft>) => void;
  addDisciplina: (dados: NovaDisciplina) => Disciplina | null;
  updateDisciplina: (
    disciplinaId: string,
    dados: Partial<Omit<Disciplina, "id" | "conteudos" | "criadoEm">>,
  ) => void;
  removeDisciplina: (disciplinaId: string) => void;
  addConteudo: (
    disciplinaId: string,
    dados: NovoConteudo,
    parentId?: string,
  ) => void;
  updateConteudo: (
    disciplinaId: string,
    conteudoId: string,
    dados: Partial<Omit<Conteudo, "id" | "filhos" | "criadoEm">>,
  ) => void;
  removeConteudo: (disciplinaId: string, conteudoId: string) => void;
  updatePeso: (disciplinaId: string, peso: number) => void;
  addCronogramaItem: (dados: NovoCronogramaItem) => void;
  updateCronogramaItem: (
    itemId: string,
    dados: Partial<Omit<CronogramaItem, "id" | "concursoId" | "criadoEm">>,
  ) => void;
  removeCronogramaItem: (itemId: string) => void;
  registrarEstudo: (dados: NovoRegistroEstudo) => void;
  resetConcurso: () => void;
}
