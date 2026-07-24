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
    {
      "id":"concurso-1784897195380-skj2xdk",
      "titulo":"Concurso Dataprev",
      "orgao":"DataPrev",
      "banca":"FGV",
      "cargo":"ANALISTA DE TECNOLOGIA DA INFORMAÇÃO",
      "nivel":"superior",
      "vagas":20,
      "salario":10685,
      "dataProva":"2026-10-11",
      "dataInscricaoInicio":"2026-07-06",
      "dataInscricaoFim":"2026-08-06",
      "urlEdital":"https://conhecimento.fgv.br/sites/default/files/concursos/edital-dataprev_supe-versaofinal.pdf",
      "observacoes":"",
      "disciplinas":[
        {
          "id":"disciplina-1784899336521-eq11dtw",
          "nome":"Português",
          "cor":"#1769aa",
          "peso":12,
          "conteudos":[
            {
              "id":"conteudo-1784899336522-wshflly",
              "titulo":"1 Compreensão e interpretação de textos de gêneros variados",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:22:16.522Z",
              "atualizadoEm":"2026-07-24T13:22:16.522Z"
            },
            {
              "id":"conteudo-1784899336522-g5v3hoo",
              "titulo":"2 Reconhecimento de tipos e gêneros textuais",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:22:16.522Z",
              "atualizadoEm":"2026-07-24T13:22:16.522Z"
            },
            {
              "id":"conteudo-1784899336522-dpcsphp",
              "titulo":"3 Domínio da ortografia oficial",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:22:16.522Z",
              "atualizadoEm":"2026-07-24T13:22:16.522Z"
            },
            {
              "id":"conteudo-1784899336522-w2bt9s1",
              "titulo":"4 Domínio dos mecanismos de coesão textual\n4.1Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual. \n4.2 Emprego de tempos e modos verbais",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:22:16.522Z",
              "atualizadoEm":"2026-07-24T13:22:16.522Z"
            },
            {
              "id":"conteudo-1784899336522-73njeq5",
              "titulo":"5 Domínio da estrutura morfossintática do período",
              "observacao":"",
              "status":"pendente",
              "filhos":[
                {
                  "id":"conteudo-1784899376070-5v7ii43",
                  "titulo":"5.1 Emprego das classes de palavras.",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:22:56.070Z",
                  "atualizadoEm":"2026-07-24T13:22:56.070Z"
                },
                {
                  "id":"conteudo-1784899385138-zrqqo2e",
                  "titulo":"5.2 Relações de coordenação entre orações e entre termos da oração.",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:23:05.138Z",
                  "atualizadoEm":"2026-07-24T13:23:05.138Z"
                },
                {
                  "id":"conteudo-1784899392044-tpw238c",
                  "titulo":"5.3 Relações de subordinação entre orações e entre termos da oração",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:23:12.044Z",
                  "atualizadoEm":"2026-07-24T13:23:12.044Z"
                },
                {
                  "id":"conteudo-1784899400772-zo2oee3",
                  "titulo":"5.4 Emprego dos sinais de pontuação.",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:23:20.772Z",
                  "atualizadoEm":"2026-07-24T13:23:20.772Z"
                },
                {
                  "id":"conteudo-1784899409378-xasgraw",
                  "titulo":"5.5 Concordância verbal e nominal.",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:23:29.378Z",
                  "atualizadoEm":"2026-07-24T13:23:29.378Z"
                },
                {
                  "id":"conteudo-1784899415093-6wesl8a",
                  "titulo":"5.6 Regência verbal e nominal.",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:23:35.093Z",
                  "atualizadoEm":"2026-07-24T13:23:35.093Z"
                },
                {
                  "id":"conteudo-1784899424289-lz54ahh",
                  "titulo":"5.7 Emprego do sinal indicativo de crase",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:23:44.289Z",
                  "atualizadoEm":"2026-07-24T13:23:44.289Z"
                },
                {
                  "id":"conteudo-1784899430220-ejwjtbd",
                  "titulo":"5.8 Colocação dos pronomes átonos",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:23:50.220Z",
                  "atualizadoEm":"2026-07-24T13:23:50.220Z"
                }
              ],
              "criadoEm":"2026-07-24T13:22:16.522Z",
              "atualizadoEm":"2026-07-24T13:24:45.051Z"
            },
            {
              "id":"conteudo-1784899336522-h7ad1w7",
              "titulo":"6.Reescrita de frases e parágrafos do texto",
              "observacao":"",
              "status":"pendente",
              "filhos":[
                {
                  "id":"conteudo-1784899439291-fpgvmdm",
                  "titulo":"6.1 Significação das palavras",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:23:59.291Z",
                  "atualizadoEm":"2026-07-24T13:23:59.291Z"
                },
                {
                  "id":"conteudo-1784899445719-1al83ma",
                  "titulo":"6.2 Substituição de palavras ou de trechos de texto.",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:24:05.719Z",
                  "atualizadoEm":"2026-07-24T13:24:05.719Z"
                },
                {
                  "id":"conteudo-1784899454696-31vni5p",
                  "titulo":"6.3 Reorganização da estrutura de orações e de períodos do texto.",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:24:14.696Z",
                  "atualizadoEm":"2026-07-24T13:24:14.696Z"
                },
                {
                  "id":"conteudo-1784899460352-3d2rshr",
                  "titulo":"6.4 Reescrita de textos de diferentes gêneros e níveis de formalidade.",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:24:20.352Z",
                  "atualizadoEm":"2026-07-24T13:24:20.352Z"
                }
              ],
              "criadoEm":"2026-07-24T13:22:16.522Z",
              "atualizadoEm":"2026-07-24T13:24:30.947Z"
            }
          ],
          "criadoEm":"2026-07-24T13:22:16.521Z",
          "atualizadoEm":"2026-07-24T14:09:35.661Z"
        },
        {
          "id":"disciplina-1784899668982-0sy946x",
          "nome":"Raciocinio Lógico",
          "cor":"#1f9d76",
          "peso":5,
          "conteudos":
          [
            {
              "id":"conteudo-1784899668983-f8t1blo",
              "titulo":"Estruturas lógicas",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:27:48.983Z",
              "atualizadoEm":"2026-07-24T13:27:48.983Z"
            },
            {
              "id":"conteudo-1784899668983-gnuhum5",
              "titulo":"Lógica de argumentação: analogias, inferências, deduções e conclusões",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:27:48.983Z",
              "atualizadoEm":"2026-07-24T13:27:48.983Z"
            },
            {
              "id":"conteudo-1784899668983-x8m3y8t",
              "titulo":"Lógica sentencial (ou proposicional)",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:27:48.983Z",
              "atualizadoEm":"2026-07-24T13:27:48.983Z"
            },
            {
              "id":"conteudo-1784899668983-n68d03q",
              "titulo":"Proposições simples e compostas",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:27:48.983Z",
              "atualizadoEm":"2026-07-24T13:27:48.983Z"
            },
            {
              "id":"conteudo-1784899668983-yn4r0xa",
              "titulo":"Tabelas-verdade",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:27:48.983Z",
              "atualizadoEm":"2026-07-24T13:27:48.983Z"
            },
            {
              "id":"conteudo-1784899668983-fnnimr4",
              "titulo":"Equivalências",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:27:48.983Z",
              "atualizadoEm":"2026-07-24T13:27:48.983Z"
            },
            {
              "id":"conteudo-1784899668983-lrbi4ji",
              "titulo":"Diagramas lógicos",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:27:48.983Z",
              "atualizadoEm":"2026-07-24T13:27:48.983Z"
            },
            {
              "id":"conteudo-1784899668983-yggb5f0",
              "titulo":"Lógica de primeira ordem",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:27:48.983Z",
              "atualizadoEm":"2026-07-24T13:27:48.983Z"
            },
            {
              "id":"conteudo-1784899668983-7pq6kzz",
              "titulo":"Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:27:48.983Z",
              "atualizadoEm":"2026-07-24T13:27:48.983Z"
            }
          ],
          "criadoEm":"2026-07-24T13:27:48.982Z",
          "atualizadoEm":"2026-07-24T14:07:51.859Z"
        },
        {
          "id":"disciplina-1784899832103-jw4higu",
          "nome":"ATUALIDADES E INTELIGÊNCIA ARTIFICIAL:",
          "cor":"#1769aa",
          "peso":6,
          "conteudos":
          [
            {
              "id":"conteudo-1784899832103-qi2toxs",
              "titulo":"Tópicos relevantes e atuais de diversas áreas, tais como segurança, transportes, política, economia, sociedade, educação, saúde, cultura, tecnologia, energia, relações internacionais, desenvolvimento sustentável e ecologia",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:30:32.103Z",
              "atualizadoEm":"2026-07-24T13:30:32.103Z"
            },
            {
              "id":"conteudo-1784899832103-210kjrw",
              "titulo":"Inteligência Artificial: fundamentos e aplicações: conceitos de inteligência artificial, aprendizado da máquina, introdução aos modelos generativos e modelos de linguagem, ética, governança e privacidade em IA.",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:30:32.103Z",
              "atualizadoEm":"2026-07-24T13:30:32.103Z"
            }
          ],
          "criadoEm":"2026-07-24T13:30:32.103Z",
          "atualizadoEm":"2026-07-24T14:07:28.944Z"
        },
        {
          "id":"disciplina-1784899991437-8nf9edx",
          "nome":"LEGISLAÇÃO ACERCA DE SEGURANÇA DA INFORMAÇÃO E PROTEÇÃO DE DADOS",
          "cor":"#1769aa",
          "peso":5,
          "conteudos":
          [
            {
              "id":"conteudo-1784899991437-uh455fn",
              "titulo":"Lei nº 12.527/2011 (Lei de Acesso à Informação): capítulos I, II, III, IV e V",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:33:11.437Z",
              "atualizadoEm":"2026-07-24T13:33:11.437Z"
            },
            {
              "id":"conteudo-1784899991437-ow3jnbj",
              "titulo":"Decreto nº 7.724",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:33:11.437Z",
              "atualizadoEm":"2026-07-24T13:33:11.437Z"
            },
            {
              "id":"conteudo-1784899991437-4xcjech",
              "titulo":"Decreto nº 7.845",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:33:11.437Z",
              "atualizadoEm":"2026-07-24T13:33:11.437Z"},
              {
                "id":"conteudo-1784899991437-ge1phjd",
                "titulo":"Lei nº 12.737/2012 (Lei de Delitos Informáticos): art. 2º",
                "observacao":"",
                "status":"pendente",
                "filhos":[],
                "criadoEm":"2026-07-24T13:33:11.437Z",
                "atualizadoEm":"2026-07-24T13:33:11.437Z"
              },
              {
                "id":"conteudo-1784899991437-t43o4vd",
                "titulo":"Lei nº 12.965/2014 (Marco Civil da Internet): capítulo II, Seção I",
                "observacao":"",
                "status":"pendente",
                "filhos":[],
                "criadoEm":"2026-07-24T13:33:11.437Z",
                "atualizadoEm":"2026-07-24T13:33:11.437Z"
              },
              {
                "id":"conteudo-1784899991437-wghgx0n",
                "titulo":"Lei nº 12.965/2014 (Marco Civil da Internet): capítulo III, Seções I e II",
                "observacao":"",
                "status":"pendente",
                "filhos":[],
                "criadoEm":"2026-07-24T13:33:11.437Z",
                "atualizadoEm":"2026-07-24T13:33:11.437Z"},
                {
                  "id":"conteudo-1784899991437-5b6j7se",
                  "titulo":"Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo I",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:33:11.437Z",
                  "atualizadoEm":"2026-07-24T13:33:11.437Z"
                },
                {
                  "id":"conteudo-1784899991437-ltmmhwr",
                  "titulo":"Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo II",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:33:11.437Z",
                  "atualizadoEm":"2026-07-24T13:33:11.437Z"
                },
                {
                  "id":"conteudo-1784899991437-zbkm8eq",
                  "titulo":"Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo III",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:33:11.437Z",
                  "atualizadoEm":"2026-07-24T13:33:11.437Z"
                },
                {
                  "id":"conteudo-1784899991437-lkbfbhv",
                  "titulo":"Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo IV",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:33:11.437Z",
                  "atualizadoEm":"2026-07-24T13:33:11.437Z"
                },
                {
                  "id":"conteudo-1784899991437-s3vwtdq",
                  "titulo":"Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo VII",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:33:11.437Z",
                  "atualizadoEm":"2026-07-24T13:33:11.437Z"
                },
                {
                  "id":"conteudo-1784899991437-fpiz3er",
                  "titulo":"Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo VIII",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:33:11.437Z",
                  "atualizadoEm":"2026-07-24T13:33:11.437Z"
                },
                {
                  "id":"conteudo-1784899991437-t8y6rq0",
                  "titulo":"Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo IX",
                  "observacao":"",
                  "status":"pendente",
                  "filhos":[],
                  "criadoEm":"2026-07-24T13:33:11.437Z",
                  "atualizadoEm":"2026-07-24T13:33:11.437Z"
                }
          ],
          "criadoEm":"2026-07-24T13:33:11.437Z",
          "atualizadoEm":"2026-07-24T14:07:50.541Z"
        },
        {
          "id":"disciplina-1784900169336-7qxfr0c",
          "nome":"DESENVOLVIMENTO DE SISTEMAS",
          "cor":"#1769aa",
          "peso":15,
          "conteudos":
          [
            {
              "id":"conteudo-1784900169336-seoymcs",
              "titulo":"Desenvolvimento de sistemas",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:36:09.336Z",
              "atualizadoEm":"2026-07-24T13:36:09.336Z"
            },
            {
              "id":"conteudo-1784900169336-ehvppp1",
              "titulo":"Desenvolvimento em Java (versão 6 ou superior)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-zs0xgwb","titulo":"JavaEE (versão 6 ou superior)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-wz996rr","titulo":"JakartaEE","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-46r6xd9","titulo":"JPA (versão 2 ou superior)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-y2xbs2k","titulo":"JavaScript","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-4j7dauf","titulo":"JUnit","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-rs7g9h5","titulo":"Hibernate","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-wvaqp1l","titulo":"JSF","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-g32v0nv","titulo":"PrimeFaces","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-eo9rey2","titulo":"Spring","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-2ypelma","titulo":"Spring Cloud","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-p2nwgr5","titulo":"Spring Boot","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-mosjmoz","titulo":"Desenvolvimento para dispositivos móveis (Android)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-bqmi6g5","titulo":"Desenvolvimento para dispositivos móveis (iOS)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-33xcmdn","titulo":"Desenvolvimento em ferramentas low-code","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-21uj3k8","titulo":"Desenvolvimento em ferramentas no-code","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-ws4t2k7","titulo":"Análise estática de código-fonte","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-unvn64e","titulo":"Clean Code","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-jym28c7","titulo":"SonarQube","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-mhglzw9","titulo":"Arquitetura de software","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-hncz1g6","titulo":"Interoperabilidade de sistemas","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-y2p531g","titulo":"Arquitetura orientada a serviços","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-rd8g3ty","titulo":"Web Services","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-1wh4qod","titulo":"Mensageria","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-krsof28","titulo":"APIs","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-3fvdze8","titulo":"Swagger","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-locqhgw","titulo":"Arquitetura orientada a objetos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-bf3akdr","titulo":"Arquitetura de aplicações web","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-kql127l","titulo":"Servidor de aplicações","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-h3075h5","titulo":"Servidor web","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-u697zt1","titulo":"Internet","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-w4cokh6","titulo":"Extranet","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-i6ooixr","titulo":"Intranet","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-26de2ff","titulo":"Portal corporativo","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-829xjna","titulo":"Finalidades, características físicas e lógicas, aplicações e serviços","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-6brk4zi","titulo":"XML","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-mlepz6r","titulo":"XSLT","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-4m1jh2l","titulo":"UDDI","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-86nduor","titulo":"REST","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-mapa8ko","titulo":"JSON","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-dgxafmi","titulo":"DevOps","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-0q2m5ou","titulo":"Git","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-05z0926","titulo":"Conceitos básicos de testes de aplicações","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-v9u9p3g","titulo":"Testes unitários","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-nput1sp","titulo":"Testes de integração","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-7kcmhcl","titulo":"Testes ágeis","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-3dwf3du","titulo":"Teste de usabilidade de software","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-3ey6p9g","titulo":"Testes automatizados","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-1gr8x1o","titulo":"Tipos de testes","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-tv18mvk","titulo":"Test-Driven Development (TDD)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-a9yma73","titulo":"Gestão do ciclo de vida de testes","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-d3y9foz","titulo":"RPA (Robotic Process Automation)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-07dy0b5","titulo":"Metodologias Ágeis de Desenvolvimento","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-ksbw2fw","titulo":"Scrum","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-iwlbmqq","titulo":"Kanban","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-gqb3ih6","titulo":"XP (Extreme Programming)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-otnmqdw","titulo":"Padrões de desenvolvimento","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-bhr1tmz","titulo":"Reuso de software","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-520qrjv","titulo":"Codificação de software transacional","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-sh6vqsv","titulo":"Codificação de software analítico","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-1df2x6v","titulo":"Codificação de software mobile","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-gezkt8u","titulo":"Codificação de APIs","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-u36o8dw","titulo":"Análise por Pontos de Função","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-wdc4549","titulo":"Story Points","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-rzfg8ew","titulo":"Engenharia de Requisitos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-uwon8dc","titulo":"Classificação de Requisitos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-dynv8r2","titulo":"Processo de Engenharia de Requisitos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-3kb9p77","titulo":"Técnicas de Elicitação de Requisitos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-u89ss86","titulo":"HTML","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-zf5psc6","titulo":"CSS","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-nwhri53","titulo":"UX (User Experience)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-8e9ec1w","titulo":"Ajax","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-dxzbhva","titulo":"Vue.js","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-9m6jg29","titulo":"Angular","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-bjc5tmk","titulo":"React","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-4jz1apx","titulo":"Padrões de frontend","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-lsy53fg","titulo":"SPA (Single Page Application)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-ehayn1l","titulo":"PWA (Progressive Web App)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-5ozp432","titulo":"HTTPS","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-9ul6t2y","titulo":"SSL/TLS","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-5lw94h3","titulo":"Blockchain","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-rtaj7a4","titulo":"Design de software","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-yvagbb8","titulo":"Arquitetura hexagonal","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-z2n7h43","titulo":"Microsserviços","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-4eo4pfj","titulo":"Orquestração de serviços","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-guddu4g","titulo":"API Gateway","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-jht9ufv","titulo":"Containers","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-9bh952g","titulo":"Transações distribuídas","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-iedtddd","titulo":"User Experience (UX)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-h0y9bor","titulo":"Sistemas de gestão de conteúdo","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-ua2ngls","titulo":"Conceitos básicos e aplicações de CMS","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-suw241t","titulo":"Arquitetura da informação","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-w29ro8p","titulo":"Portais corporativos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-z98qd6g","titulo":"Workflow","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-vif28zg","titulo":"Acessibilidade","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-v5b1nhh","titulo":"Usabilidade","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-lpsjaph","titulo":"Desenho e planejamento de interação em aplicações web","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-gvb6kjr","titulo":"Inteligência Artificial","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-gpx2icn","titulo":"Análise de Dados","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"},
            {"id":"conteudo-1784900169336-th82not","titulo":"Big Data","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:36:09.336Z","atualizadoEm":"2026-07-24T13:36:09.336Z"}
          ],
          "criadoEm":"2026-07-24T13:36:09.336Z",
          "atualizadoEm":"2026-07-24T14:08:46.416Z"
        },
        {
          "id":"disciplina-1784900418858-slbvoul",
          "nome":"INTELIGÊNCIA DE NEGÓCIOS (BUSINESS INTELLIGENCE",
          "cor":"#1769aa",
          "peso":15,
          "conteudos":
          [
            {"id":"conteudo-1784900418858-r2svmlh","titulo":"Conceitos de Business Intelligence (BI)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-ej5b7go","titulo":"Fundamentos de Business Intelligence (BI)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-tvi7ium","titulo":"Características de Business Intelligence (BI)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-55rbhg6","titulo":"Técnicas de Business Intelligence (BI)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-r58hprh","titulo":"Métodos de Business Intelligence (BI)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-v63d8v6","titulo":"Sistemas de Suporte à Decisão (DSS)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-zfdf4f8","titulo":"Gestão de conteúdo","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-37bmryx","titulo":"Arquitetura de Data Warehouse","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-sxyrpxf","titulo":"ETL (Extract, Transform and Load)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-tqqqprx","titulo":"OLAP (Online Analytical Processing)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-mlxp1u0","titulo":"Conceitos de Data Warehouse","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-jbj24m2","titulo":"Conceitos de Data Mining","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-wkjscjg","titulo":"Visualização de dados","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-rwa0yp1","titulo":"Bancos de Dados individuais","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-2xb9eue","titulo":"Cubos OLAP","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-8nu50ak","titulo":"Mapeamento de fontes de dados","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-nyfdc0i","titulo":"Técnicas de coleta de dados","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"},
            {"id":"conteudo-1784900418858-6rzo0ae","titulo":"Arquitetura de Business Intelligence (BI)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:40:18.858Z","atualizadoEm":"2026-07-24T13:40:18.858Z"}
          ],
          "criadoEm":"2026-07-24T13:40:18.858Z",
          "atualizadoEm":"2026-07-24T14:08:48.198Z"
        },
        {
          "id":"disciplina-1784900499463-m1qtveu",
          "nome":"SEGURANÇA DA INFORMAÇÃO",
          "cor":"#1769aa",
          "peso":15,
          "conteudos":[
            {
              "id":"conteudo-1784900499463-g56y57v",
              "titulo":"Políticas de segurança da informação",
              "observacao":"",
              "status":"pendente",
              "filhos":[],
              "criadoEm":"2026-07-24T13:41:39.463Z",
              "atualizadoEm":"2026-07-24T13:41:39.463Z"
            },
            {"id":"conteudo-1784900499463-o7fu2e6","titulo":"Procedimentos de segurança","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-luc2hkr","titulo":"Conceitos gerais de gerenciamento de segurança","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-9qpudcz","titulo":"ABNT NBR ISO/IEC 27001:2022","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-ujiqd4p","titulo":"ABNT NBR ISO/IEC 27002:2022","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-bg6d7fs","titulo":"Confiabilidade","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-cvgxzpn","titulo":"Integridade","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-ops8ave","titulo":"Disponibilidade","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-nxgedeh","titulo":"Mecanismos de segurança","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},              {"id":"conteudo-1784900499463-i7a55bn","titulo":"Controle de acesso","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-zvazi7u","titulo":"OAuth 2.0","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-6ca8r1w","titulo":"SSO (Single Sign-On)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-s1gxz8c","titulo":"Gerência de riscos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-5wvcna4","titulo":"Ameaças","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-bwrqid0","titulo":"Vulnerabilidades","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-x6bebfg","titulo":"Impacto de riscos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-ygj370y","titulo":"Ciclo de Vida de Desenvolvimento Seguro (SDL – Security Development Lifecycle)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-jhuvtuj","titulo":"OWASP Top 10","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-ubq3nnh","titulo":"Análise Estática de Segurança de Aplicações (SAST)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"},
            {"id":"conteudo-1784900499463-z4avphm","titulo":"Análise Dinâmica de Segurança de Aplicações (DAST)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:41:39.463Z","atualizadoEm":"2026-07-24T13:41:39.463Z"}
          ],
          "criadoEm":"2026-07-24T13:41:39.463Z",
          "atualizadoEm":"2026-07-24T14:08:50.011Z"
        },
        {
        "id":"disciplina-1784900659772-21o4sfg",
        "nome":"BANCO DE DADOS",
        "cor":"#1769aa",
        "peso":15,
        "conteudos":[
          {
            "id":"conteudo-1784900659772-3uj7ncn",
            "titulo":"Políticas de segurança da informação",
            "observacao":"",
            "status":"pendente",
            "filhos":[],
            "criadoEm":"2026-07-24T13:44:19.772Z",
            "atualizadoEm":"2026-07-24T13:44:19.772Z"
          },
          {"id":"conteudo-1784900659772-6o54ybb","titulo":"Procedimentos de segurança","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-ajsxfax","titulo":"Conceitos gerais de gerenciamento de segurança","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-bxnkzac","titulo":"ABNT NBR ISO/IEC 27001:2022","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-aduu0yj","titulo":"ABNT NBR ISO/IEC 27002:2022","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-cjyd5qe","titulo":"Confiabilidade","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-3hd0gb6","titulo":"Integridade","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-30vepr4","titulo":"Disponibilidade","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-b8uv5nf","titulo":"Mecanismos de segurança","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-7q8k3zi","titulo":"Controle de acesso","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-b4g0h0d","titulo":"OAuth 2.0","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-h6ef3qq","titulo":"SSO (Single Sign-On)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-38dzpo8","titulo":"Gerência de riscos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-in2ji5o","titulo":"Ameaças","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-4uf9fcb","titulo":"Vulnerabilidades","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-312q57z","titulo":"Impacto de riscos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-t2vh7tp","titulo":"Ciclo de Vida de Desenvolvimento Seguro (SDL – Security Development Lifecycle)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-ffpbiro","titulo":"OWASP Top 10","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-ag2tsch","titulo":"Análise Estática de Segurança de Aplicações (SAST)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"},
          {"id":"conteudo-1784900659772-s6067il","titulo":"Análise Dinâmica de Segurança de Aplicações (DAST)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:44:19.772Z","atualizadoEm":"2026-07-24T13:44:19.772Z"}
        ],
        "criadoEm":"2026-07-24T13:44:19.772Z",
        "atualizadoEm":"2026-07-24T14:08:51.927Z"
      },
      {
        "id":"disciplina-1784900914806-k5j1ba1",
        "nome":"GESTÃO E GOVERNANÇA DE TECNOLOGIA DA INFORMAÇÃO",
        "cor":"#1769aa",
        "peso":15,
        "conteudos":[
          {
            "id":"conteudo-1784900914806-uw8rlvp",
            "titulo":"Gerenciamento de projetos",
            "observacao":"",
            "status":"pendente",
            "filhos":[],
            "criadoEm":"2026-07-24T13:48:34.806Z",
            "atualizadoEm":"2026-07-24T13:48:34.806Z"
          },
          {
            "id":"conteudo-1784900914806-l2gfb7g",
            "titulo":"Conceitos de gerenciamento de projetos",
            "observacao":"",
            "status":"pendente",
            "filhos":[],
            "criadoEm":"2026-07-24T13:48:34.806Z",
            "atualizadoEm":"2026-07-24T13:48:34.806Z"
          },
          {"id":"conteudo-1784900914806-c893lox","titulo":"Áreas de conhecimento em gerenciamento de projetos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-moir21e","titulo":"Projetos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-3r2rhe4","titulo":"Programas","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-tihnn3k","titulo":"Portfólio de projetos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-lt8js5d","titulo":"Abordagem tradicional de gerenciamento de projetos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-rh5noe9","titulo":"Abordagem híbrida de gerenciamento de projetos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-trzsx9b","titulo":"Abordagem ágil de gerenciamento de projetos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-ux1g0so","titulo":"Scrum","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-rsh72tv","titulo":"Guia Scrum","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-bf8znzj","titulo":"Metodologia Lean","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-w1r1svl","titulo":"Método Kanban","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-wr95by2","titulo":"Práticas ágeis para gerenciamento de projetos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-6y0q8mg","titulo":"Processos de gerenciamento de projetos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-sb87xow","titulo":"Grupos de processos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-dwoq7ls","titulo":"Áreas de conhecimento do PMBOK","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-jbdqn8a","titulo":"Gestão de riscos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-du7lsw8","titulo":"ITIL v4","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-u6d4yvr","titulo":"Conceitos básicos do ITIL v4","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-auqbl58","titulo":"Disciplinas do ITIL v4","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-fjcimcl","titulo":"Estrutura do ITIL v4","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-5g5scmd","titulo":"Objetivos do ITIL v4","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-i0kp3gv","titulo":"COBIT 2019","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-4rkv1nn","titulo":"Conceitos básicos do COBIT 2019","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-2rek0dt","titulo":"Estrutura do COBIT 2019","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-x6duolp","titulo":"Objetivos do COBIT 2019","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-9l8okzn","titulo":"Gestão de processos","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-xn5a4xk","titulo":"Modelagem de processos de negócio","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"},
          {"id":"conteudo-1784900914806-jdm805d","titulo":"BPMN (Business Process Model and Notation)","observacao":"","status":"pendente","filhos":[],"criadoEm":"2026-07-24T13:48:34.806Z","atualizadoEm":"2026-07-24T13:48:34.806Z"}
        ],
        "criadoEm":"2026-07-24T13:48:34.806Z",
        "atualizadoEm":"2026-07-24T14:08:57.639Z"
      }
    ],
    "criadoEm":"2026-07-24T12:46:35.380Z",
    "atualizadoEm":"2026-07-24T14:09:35.661Z"
  }

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
    const legado = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    const item = window.localStorage.getItem(STORAGE_KEY);
    const test = localStorage.getItem("gestao-concursos:estado")
    if (test) {
        const estado = JSON.parse(test);
        console.log(JSON.stringify(estado.concursos[2]));
      }
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
