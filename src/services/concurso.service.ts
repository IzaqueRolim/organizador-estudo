import type { AppConcursoState, Concurso, ConcursoDraft } from "../types/concurso";

const STORAGE_KEY = "gestao-concursos:estado";
const LEGACY_STORAGE_KEY = "gestao-concursos:concurso";

export const nowIso = () => new Date().toISOString();

export const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const criarConcursoPadrao = (
  dados: Partial<ConcursoDraft> = {},
): Concurso => {
  const data = nowIso();

  return {
    id: createId("concurso"),
    titulo: dados.titulo?.trim() || "Meu concurso",
    orgao: dados.orgao?.trim() || "",
    banca: dados.banca?.trim() || "",
    cargo: dados.cargo?.trim() || "",
    nivel: dados.nivel || "superior",
    vagas: dados.vagas ?? 0,
    salario: dados.salario ?? 0,
    dataProva: dados.dataProva || "",
    dataInscricaoInicio: dados.dataInscricaoInicio || "",
    dataInscricaoFim: dados.dataInscricaoFim || "",
    urlEdital: dados.urlEdital || "",
    observacoes: dados.observacoes || "",
    disciplinas: [],
    criadoEm: data,
    atualizadoEm: data,
  };
};

export const concursoInicial: Concurso = criarConcursoPadrao();

export const criarEstadoInicial = (): AppConcursoState => {
  const concurso = criarConcursoPadrao();

  return {
    concursos: [concurso],
    concursoIdAtivo: concurso.id,
    cronograma: [],
    registrosEstudo: [],
  };
};

const storageDisponivel = () =>
  typeof window !== "undefined" && Boolean(window.localStorage);

const isConcurso = (valor: unknown): valor is Concurso => {
  if (!valor || typeof valor !== "object") {
    return false;
  }

  const concurso = valor as Partial<Concurso>;
  return (
    typeof concurso.id === "string" &&
    typeof concurso.titulo === "string" &&
    Array.isArray(concurso.disciplinas)
  );
};

const isEstado = (valor: unknown): valor is AppConcursoState => {
  if (!valor || typeof valor !== "object") {
    return false;
  }

  const estado = valor as Partial<AppConcursoState>;
  return (
    Array.isArray(estado.concursos) &&
    typeof estado.concursoIdAtivo === "string" &&
    Array.isArray(estado.cronograma) &&
    Array.isArray(estado.registrosEstudo)
  );
};

export const concursoService = {
  carregar(): AppConcursoState {
    if (!storageDisponivel()) {
      return criarEstadoInicial();
    }

    const item = window.localStorage.getItem(STORAGE_KEY);
    if (item) {
      try {
        const parsed = JSON.parse(item);
        if (isEstado(parsed) && parsed.concursos.length > 0) {
          return {
            ...parsed,
            concursoIdAtivo:
              parsed.concursos.some(
                (concurso) => concurso.id === parsed.concursoIdAtivo,
              )
                ? parsed.concursoIdAtivo
                : parsed.concursos[0].id,
          };
        }
      } catch {
        return criarEstadoInicial();
      }
    }

    const legado = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legado) {
      return criarEstadoInicial();
    }

    try {
      const parsed = JSON.parse(legado);
      if (!isConcurso(parsed)) {
        return criarEstadoInicial();
      }

      return {
        concursos: [parsed],
        concursoIdAtivo: parsed.id,
        cronograma: [],
        registrosEstudo: [],
      };
    } catch {
      return criarEstadoInicial();
    }
  },

  salvar(estado: AppConcursoState) {
    if (!storageDisponivel()) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  },

  limpar() {
    if (!storageDisponivel()) {
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  },
};
