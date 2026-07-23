import type { AppConcursoState, Concurso, ConcursoDraft, CronogramaItem } from "../types/concurso";
import { dataLocalIso } from "../utils/concursoStats";

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
  const concursosBB: Concurso[] = [
    {
      id: "concurso-1783536251757-rf8gds9",
      titulo: "Concurso BB",
      orgao: "BB",
      banca: "FGV",
      cargo: "TI",
      nivel: "medio",
      vagas: 500,
      salario: 5000,
      dataProva: "2027-05-08",
      dataInscricaoInicio: "2026-10-02",
      dataInscricaoFim: "2026-11-02",
      urlEdital:
        "https://documento.vunesp.com.br/documento/stream/NzEzOTYxNw%3d%3d",
      observacoes: "",
      disciplinas: [
        {
          id: "disciplina-1783536391157-oo8nns8",
          nome: "LÍNGUA PORTUGUESA",
          cor: "#1769aa",
          peso: 3,
          conteudos: [
            {
              id: "conteudo-1783536405555-ygqely3",
              titulo: "Compreensão de textos",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-08T18:46:45.555Z",
              atualizadoEm: "2026-07-08T18:46:45.555Z",
            },
            {
              id: "conteudo-1783536419247-cyv9cpl",
              titulo: "Ortografia oficial",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-08T18:46:59.247Z",
              atualizadoEm: "2026-07-08T18:47:06.896Z",
            },
            {
              id: "conteudo-1783536440119-uhi4pox",
              titulo: "Classe e emprego de palavras.",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-08T18:47:20.119Z",
              atualizadoEm: "2026-07-08T18:47:20.119Z",
            },
          ],
          criadoEm: "2026-07-08T18:46:31.156Z",
          atualizadoEm: "2026-07-08T18:47:20.119Z",
        },
        {
          id: "disciplina-1783536615950-ismj8wj",
          nome: "Conhecimentos Bancários",
          cor: "#1769aa",
          peso: 1,
          conteudos: [],
          criadoEm: "2026-07-08T18:50:15.950Z",
          atualizadoEm: "2026-07-08T18:50:23.076Z",
        },
      ],
      criadoEm: "2026-07-08T18:44:11.757Z",
      atualizadoEm: "2026-07-08T18:50:23.076Z",
    },
    {
      id:"concurso-1783536251757-rf8gds9",
      titulo:"Concurso BB",
      orgao:"BB",
      banca:"FGV",
      cargo:"TI",
      nivel:"medio",
      vagas:500,
      salario:5000,
      dataProva:"2027-05-08",
      dataInscricaoInicio:"2026-10-02",
      dataInscricaoFim:"2026-11-02",
      urlEdital:"https://documento.vunesp.com.br/documento/stream/NzEzOTYxNw%3d%3d",
      observacoes:"",
      disciplinas:[
        {
          id:"disciplina-1783536391157-oo8nns8",
          nome:"LÍNGUA PORTUGUESA",
          cor:"#1769aa",
          peso:3,
          conteudos:[
            {
              id:"conteudo-1783536405555-ygqely3",
              titulo:"Compreensão de textos",
              observacao:"",
              status:"pendente",
              filhos:[],
              criadoEm:"2026-07-08T18:46:45.555Z",
              atualizadoEm:"2026-07-08T18:46:45.555Z"
            },
            {
              id:"conteudo-1783536419247-cyv9cpl",
              titulo:"Ortografia oficial",
              observacao:"",
              status:"pendente",
              filhos:[],
              criadoEm:"2026-07-08T18:46:59.247Z",
              atualizadoEm:"2026-07-08T18:47:06.896Z"
            },
            {
              id:"conteudo-1783536440119-uhi4pox",
              titulo:"Classe e emprego de palavras.",
              observacao:"",
              status:"pendente",
              filhos:[],
              criadoEm:"2026-07-08T18:47:20.119Z",
              atualizadoEm:"2026-07-08T18:47:20.119Z"
            }
          ],
          criadoEm:"2026-07-08T18:46:31.156Z",
          atualizadoEm:"2026-07-08T18:47:20.119Z"
        },
        {
          id:"disciplina-1783536615950-ismj8wj",
          nome:"Conhecimentos Bancários",
          cor:"#1769aa",
          peso:1,
          conteudos:[],
          criadoEm:"2026-07-08T18:50:15.950Z",
          atualizadoEm:"2026-07-08T18:50:23.076Z"
        }
      ],
      criadoEm:"2026-07-08T18:44:11.757Z",
      atualizadoEm:"2026-07-08T18:50:23.076Z"
      },
      {
      id: "concurso-1783623554351-bb2",
      titulo: "Concurso BB",
      orgao: "BB",
      banca: "FGV",
      cargo: "TI",
      nivel: "medio",
      vagas: 500,
      salario: 5000,
      dataProva: "2027-05-08",
      dataInscricaoInicio: "2026-10-02",
      dataInscricaoFim: "2026-11-02",
      urlEdital:
        "https://documento.vunesp.com.br/documento/stream/NzEzOTYxNw%3d%3d",
      observacoes: "",
      disciplinas: [
        {
          id: "disciplina-1783623554351-qrb53a4",
          nome: "PROBABILIDADE E ESTATÍSTICA",
          cor: "#1f9d76",
          peso: 5,
          conteudos: [
            {
              id: "conteudo-1783623554351-1p4fmpz",
              titulo: "1 - Representação tabular e gráfica",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T19:03:09.260Z",
            },
            {
              id: "conteudo-1783623554351-pkzp4sp",
              titulo:
                "2 - Medidas de tendência central (média, mediana, moda, medidas de posição, mínimo e máximo) e de dispersão (amplitude, amplitude interquartil, variância, desvio padrão e coeficiente de variação)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T19:03:07.968Z",
            },
            {
              id: "conteudo-1783623554351-f98yekd",
              titulo: "3 - Variáveis aleatórias e distribuição de probabilidade",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T18:59:14.351Z",
            },
            {
              id: "conteudo-1783623554351-yeowdrd",
              titulo: "4 - Teorema de Bayes",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T18:59:14.351Z",
            },
            {
              id: "conteudo-1783623554351-u12vk7z",
              titulo: "5 - Probabilidade condicional",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T18:59:14.351Z",
            },
            {
              id: "conteudo-1783623554351-vop6zrv",
              titulo: "6 - População e amostra",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T18:59:14.351Z",
            },
            {
              id: "conteudo-1783623554351-agojyfq",
              titulo: "7 - Variância e covariância",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T18:59:14.351Z",
            },
            {
              id: "conteudo-1783623554351-f38whke",
              titulo: "8 - Correlação linear simples",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T18:59:14.351Z",
            },
            {
              id: "conteudo-1783623554351-cl7eip1",
              titulo: "9 - Distribuição binomial e distribuição normal",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T18:59:14.351Z",
            },
            {
              id: "conteudo-1783623554351-n4h90h0",
              titulo: "10 - Noções de amostragem e inferência estatística.",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T18:59:14.351Z",
              atualizadoEm: "2026-07-09T18:59:14.351Z",
            },
          ],
          criadoEm: "2026-07-09T18:59:14.351Z",
          atualizadoEm: "2026-07-09T19:57:07.026Z",
        },
        {
          id: "disciplina-1783623719220-k1ztste",
          nome: "Português",
          cor: "#1769aa",
          peso: 15,
          conteudos: [
            {
              id: "conteudo-1783623719220-pgt30c0",
              titulo: "1 - Compreensão de textos",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T19:01:59.220Z",
              atualizadoEm: "2026-07-09T19:01:59.220Z",
            },
            {
              id: "conteudo-1783623719220-fb1jg0u",
              titulo: "2 - Ortografia oficial",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T19:01:59.220Z",
              atualizadoEm: "2026-07-09T19:01:59.220Z",
            },
            {
              id: "conteudo-1783623719220-fw5whqw",
              titulo: "3 - Classe e emprego de palavras",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T19:01:59.220Z",
              atualizadoEm: "2026-07-09T19:01:59.220Z",
            },
            {
              id: "conteudo-1783623719220-1m4865p",
              titulo: "4 - Emprego do acento indicativo de crase",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T19:01:59.220Z",
              atualizadoEm: "2026-07-09T19:01:59.220Z",
            },
            {
              id: "conteudo-1783623719220-y892y5g",
              titulo: "5 - Sintaxe da oração e do período",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-09T19:01:59.220Z",
              atualizadoEm: "2026-07-09T19:01:59.220Z",
            },
          ],
          criadoEm: "2026-07-09T19:01:59.220Z",
          atualizadoEm: "2026-07-09T19:57:06.988Z",
        },
      ],
      criadoEm: "2026-07-09T18:59:14.351Z",
      atualizadoEm: "2026-07-09T19:57:07.026Z",
    },
  ];

  return {
    concursos: concursosBB,
    concursoIdAtivo: concursosBB[0].id,
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

const normalizarCronograma = (cronograma: unknown[]): CronogramaItem[] =>
  cronograma.map((item) => {
    if (!item || typeof item !== "object") {
      return {
        id: createId("cronograma"),
        concursoId: "",
        data: dataLocalIso(),
        horario: "19:00",
        duracaoMinutos: 60,
        titulo: "Estudo",
        concluido: false,
        criadoEm: nowIso(),
        atualizadoEm: nowIso(),
      } as CronogramaItem;
    }

    const entrada = item as Partial<CronogramaItem>;

    return {
      id: entrada.id || createId("cronograma"),
      concursoId: entrada.concursoId || "",
      data: entrada.data || dataLocalIso(),
      dia: entrada.dia,
      horario: entrada.horario || "19:00",
      duracaoMinutos: Math.max(5, entrada.duracaoMinutos || 60),
      disciplinaId: entrada.disciplinaId,
      conteudoId: entrada.conteudoId,
      titulo: entrada.titulo || "Estudo",
      concluido: Boolean(entrada.concluido),
      criadoEm: entrada.criadoEm || nowIso(),
      atualizadoEm: entrada.atualizadoEm || nowIso(),
    } as CronogramaItem;
  });

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
            cronograma: normalizarCronograma(parsed.cronograma),
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
