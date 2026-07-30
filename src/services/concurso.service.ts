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
    id:"concurso-1783692515900-f2kwcld",
    titulo:"Concurso TJSP",
    orgao:"TJ-SP",
    banca:"Vunesp",
    cargo:"Escrevente Judiciário",
    nivel:"medio",
    vagas:700,
    salario:6000,
    dataProva:"2026-12-07",
    dataInscricaoInicio:"2026-08-13",
    dataInscricaoFim:"2026-09-22",
    urlEdital:"https://documento.vunesp.com.br/documento/stream/NzEzOTYxNw%3d%3d",
    observacoes:"",
    disciplinas:[   
      {
        id: "disciplina-1783950865358-599usxi",
        nome: "DIREITO CONSTITUCIONAL",
        cor: "#1769aa",
        peso: 1,
        conteudos: [
          {
            id: "conteudo-1783950865358-drbpsrk",
            titulo: "Constituição Federal – Título II - Capítulos I, II e III",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T13:54:25.358Z",
            atualizadoEm: "2026-07-13T19:06:52.155Z"
          },
          {
            id: "conteudo-1783950865358-1mrvi2n",
            titulo: "Constituição Federal - Título III- Capítulo VII com Seções I e II;",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T13:54:25.358Z",
            atualizadoEm: "2026-07-13T13:54:25.358Z"
          },
          {
            id: "conteudo-1783950865358-qlhc6ye",
            titulo: "Constituição Federal - artigo 92.",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T13:54:25.358Z",
            atualizadoEm: "2026-07-13T13:54:25.358Z"
          }
        ],
        criadoEm: "2026-07-13T13:54:25.358Z",
        atualizadoEm: "2026-07-13T19:06:52.155Z"
      },
      {
        id: "disciplina-1783950919994-pkrz4ni",
        nome: "Direito Administrativo",
        cor: "#1f9d76",
        peso: 1,
        conteudos: [
          {
            id: "conteudo-1783950944579-5syzspc",
            titulo: "Lei Federal n.º 8.429/92 (Lei de Improbidade Administrativa)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T13:55:44.579Z",
            atualizadoEm: "2026-07-13T13:55:44.579Z"
          },
          {
            id: "conteudo-1783950962204-iioiak0",
            titulo: "Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei n.º 10.261/68)",
            observacao: "",
            status: "pendente",
            filhos: [
              {
                id: "conteudo-1783950973242-k95ne5a",
                titulo: "artigos 1º a 86",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T13:56:13.242Z",
                atualizadoEm: "2026-07-13T13:56:13.242Z"
              },
              {
                id: "conteudo-1783950989053-e61k1tj",
                titulo: "artigos 171 a 175",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T13:56:29.053Z",
                atualizadoEm: "2026-07-13T13:56:29.053Z"
              },
              {
                id: "conteudo-1783951006743-7vvht90",
                titulo: "artigos 239 a 323",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T13:56:46.743Z",
                atualizadoEm: "2026-07-13T13:56:46.743Z"
              }
            ],
            criadoEm: "2026-07-13T13:56:02.204Z",
            atualizadoEm: "2026-07-13T13:56:46.743Z"
          }
        ],
        criadoEm: "2026-07-13T13:55:19.994Z",
        atualizadoEm: "2026-07-13T13:56:46.743Z"
      },
      {
        id: "disciplina-1783954167741-c1l8x92",
        nome: "Direito Processual Civil",
        cor: "#1769aa",
        peso: 1,
        conteudos: [
          {
            id: "conteudo-1783954167741-5rasvrz",
            titulo: "3.1. Código de Processo Civil",
            observacao: "",
            status: "pendente",
            filhos: [
              {
                id: "conteudo-1783954185115-gl4lfag",
                titulo: "artigos 144 a 155",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T14:49:45.115Z",
                atualizadoEm: "2026-07-13T14:49:45.115Z"
              },
              {
                id: "conteudo-1783954205434-p94f0f4",
                titulo: "artigos 188 a 275",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T14:50:05.434Z",
                atualizadoEm: "2026-07-13T14:50:05.434Z"
              },
              {
                id: "conteudo-1783954225958-8zumkzx",
                titulo: "artigos 294 a 311 e do 318 a 538;",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T14:50:25.958Z",
                atualizadoEm: "2026-07-13T14:50:25.958Z"
              },
              {
                id: "conteudo-1783954233448-1vsxm0d",
                titulo: "artigos 994 a 1026",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T14:50:33.448Z",
                atualizadoEm: "2026-07-13T14:50:33.448Z"
              }
            ],
            criadoEm: "2026-07-13T14:49:27.741Z",
            atualizadoEm: "2026-07-13T14:50:33.448Z"
          },
          {
            id: "conteudo-1783954167741-hg4efcf",
            titulo: "3.2. Lei n.º 9.099 de 26.09.1995 (artigos 3º ao 19)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T14:49:27.741Z",
            atualizadoEm: "2026-07-13T14:49:27.741Z"
          },
          {
            id: "conteudo-1783954167741-4fq6wu3",
            titulo: "3.3. Lei n.º 12.153 de 22/12/2009",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T14:49:27.741Z",
            atualizadoEm: "2026-07-13T14:49:27.741Z"
          }
        ],
        criadoEm: "2026-07-13T14:49:27.741Z",
        atualizadoEm: "2026-07-13T14:50:33.448Z"
      },
      {
        id: "disciplina-1783955495447-4asue2c",
        nome: "Direito Penal",
        cor: "#1769aa",
        peso: 1,
        conteudos: [
          {
            id: "conteudo-1783955495447-3j00u8k",
            titulo: "Código Penal - artigos 293 a 305(falsificação de titulos,selos e documentos públicos)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:11:35.447Z",
            atualizadoEm: "2026-07-13T15:11:35.447Z"
          },
          {
            id: "conteudo-1783955495447-nbmc86w",
            titulo: "Código Penal - artigos 307 e 308(falsa identidade)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:11:35.447Z",
            atualizadoEm: "2026-07-13T15:11:35.447Z"
          },
         
          {
            id: "conteudo-1783955495448-1g2np94",
            titulo: "Código Penal - artigos 311-A(Fraudes em certames de interesse público)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:11:35.448Z",
            atualizadoEm: "2026-07-13T15:11:35.448Z"
          },
          {
            id: "conteudo-1783955495448-z0m1cgw",
            titulo: "Código Penal - artigos 312 a 317(CRIMES PRATICADOS POR FUNCIONÁRIO PÚBLICO CONTRA A ADMINISTRAÇÃO EM GERAL)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:11:35.448Z",
            atualizadoEm: "2026-07-13T15:11:35.448Z"
          },
          {
            id: "conteudo-1783955495448-nslhlql",
            titulo: "Código Penal - artigos 319 a 333(Mais CRIMES PRATICADOS POR FUNCIONÁRIO PÚBLICO e PARTICULAR CONTRA A ADMINISTRAÇÃO EM GERAL)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:11:35.448Z",
            atualizadoEm: "2026-07-13T15:11:35.448Z"
          },
          {
            id: "conteudo-1783955495448-qnojebo",
            titulo: "Código Penal - artigos 336 e 337(Inutilização de edital ou de sinal e Subtração ou inutilização de livro ou documento)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:11:35.448Z",
            atualizadoEm: "2026-07-13T15:11:35.448Z"
          },
          {
            id: "conteudo-1783955495448-atlzulq",
            titulo: "Código Penal - artigos 339 a 347(CRIMES CONTRA A ADMINISTRAÇÃO DA JUSTIÇA)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:11:35.448Z",
            atualizadoEm: "2026-07-13T15:11:35.448Z"
          },
          {
            id: "conteudo-1783955495448-4rqhq13",
            titulo: "Código Penal - artigos 357 e 359(MAIS CRIMES CONTRA A ADMINISTRAÇÃO DA JUSTIÇA)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:11:35.448Z",
            atualizadoEm: "2026-07-13T15:11:35.448Z"
          }
        ],
        criadoEm: "2026-07-13T15:11:35.447Z",
        atualizadoEm: "2026-07-13T15:11:35.448Z"
      },
      {
        id: "disciplina-1783955746705-rlqfqq2",
        nome: "Legislação Interna",
        cor: "#d64550",
        peso: 1,
        conteudos: [
          {
            id: "conteudo-1783955846561-g2svhlo",
            titulo: "Resolução TJSP nº 850/2021 (Regulamenta o teletrabalho no âmbito do Tribunal de Justiça do Estado de São Paulo e dá outras providências).",
            observacao: "Disponível em: <https://esaj.tjsp.jus.br/gcnfrontend-vue/legislacao/find/196070>",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:17:26.561Z",
            atualizadoEm: "2026-07-13T15:17:26.561Z"
          },
          {
            id: "conteudo-1783955932374-kq6857h",
            titulo: "Resolução TJSP nº 963/2025 (Dispõe sobre a governança e utilização do sistema eproc nas unidades do Poder Judiciário do Estado de São Paulo e dá outras providências).",
            observacao: "Disponível em: <https://esaj.tjsp.jus.br/gcn-frontend-vue/legislacao/find/229313>",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:18:52.374Z",
            atualizadoEm: "2026-07-13T15:18:52.374Z"
          },
          {
            id: "conteudo-1783955989929-x6yqgwi",
            titulo: "Lei Complementar n° 1.111/2010 (Institui o Plano de Cargos e Carreiras dos servidores do Tribunal de Justiça do Estado de São Paulo e dá providências correlatas)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:19:49.929Z",
            atualizadoEm: "2026-07-13T15:19:49.929Z"
          },
          {
            id: "conteudo-1783956017290-y4ivzyx",
            titulo: "Regimento Interno do Tribunal de Justiça.",
            observacao: "Disponível em: <https://www.tjsp.jus.br/Download/Portal/Biblioteca/Biblioteca/Legislacao/RegimentoInternoTJSP.pdf?d=1751054637027>",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:20:17.290Z",
            atualizadoEm: "2026-07-13T15:20:17.290Z"
          },
          {
            id: "conteudo-1783962268703-742innu",
            titulo: "Normas da Corregedoria Geral da Justiça:",
            observacao: "Disponível em: <https://www.tjsp.jus.br/Corregedoria/Comunicados/NormasJudiciais>",
            status: "pendente",
            filhos: [
              {
                id: "conteudo-1783962285439-3av16f4",
                titulo: "Tomo I – Capítulo II: Seção I – subseções I e II;",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T17:04:45.439Z",
                atualizadoEm: "2026-07-13T17:04:45.439Z"
              },
              {
                id: "conteudo-1783962296168-83vl6gz",
                titulo: "Tomo I - Capítulo III: Seções I, II, V, VI, VII;",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T17:04:56.168Z",
                atualizadoEm: "2026-07-13T17:04:56.168Z"
              },
              {
                id: "conteudo-1783962305701-kdki5lg",
                titulo: "Tomo I - Capítulo III: Seção VIII – subseções I, II e III;",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T17:05:05.701Z",
                atualizadoEm: "2026-07-13T17:05:05.701Z"
              },
              {
                id: "conteudo-1783962315766-39l2q7g",
                titulo: "Tomo I – Capítulo III: Seções IX a XIX;",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T17:05:15.766Z",
                atualizadoEm: "2026-07-13T17:05:15.766Z"
              },
              {
                id: "conteudo-1783962325552-2yz194w",
                titulo: "Tomo I – Capítulo XI: Seções I, IV e V;",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T17:05:25.552Z",
                atualizadoEm: "2026-07-13T17:05:25.552Z"
              },
              {
                id: "conteudo-1783962350604-ydouczs",
                titulo: "Tomo I – Capítulo XI: Seção I a VII.",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T17:05:50.604Z",
                atualizadoEm: "2026-07-13T17:05:50.604Z"
              }
            ],
            criadoEm: "2026-07-13T17:04:28.703Z",
            atualizadoEm: "2026-07-13T17:05:50.604Z"
          }
        ],
        criadoEm: "2026-07-13T15:15:46.705Z",
        atualizadoEm: "2026-07-13T17:05:50.604Z"
      },
      {
        id: "disciplina-1783956932055-yi5kvo5",
        nome: "Português",
        cor: "#1769aa",
        peso: 1,
        conteudos: [
          {
            id: "conteudo-1783956932056-v1ix6d7",
            titulo: "Análise, compreensão e interpretação de diversos tipos de textos verbais, não verbais, literários e não literários",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-93glkv8",
            titulo: "Informações literais e inferências possíveis",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-29h7nx2",
            titulo: "Ponto de vista do autor",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-7lm2tg1",
            titulo: "Estruturação do texto: relações entre ideias, recursos de coesão",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-4k26teg",
            titulo: "Significação contextual de palavras e expressões",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-hb25kyc",
            titulo: "Sinônimos e antônimos",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-sx5vstg",
            titulo: "Sentido próprio e figurado das palavras",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-0u4myuj",
            titulo: "Classes de palavras: emprego e sentido que imprimem às relações que estabelecem",
            observacao: "",
            status: "pendente",
            filhos: [
              {
                id: "conteudo-1783956960775-6346k2p",
                titulo: "substantivo",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T15:36:00.775Z",
                atualizadoEm: "2026-07-13T15:36:00.775Z"
              },
              {
                id: "conteudo-1783957058043-1dz1tfd",
                titulo: "adjetivo",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T15:37:38.043Z",
                atualizadoEm: "2026-07-13T15:37:38.043Z"
              },
              {
                id: "conteudo-1783957066343-ivz1f1f",
                titulo: "artigo",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T15:37:46.343Z",
                atualizadoEm: "2026-07-13T15:37:46.343Z"
              },
              {
                id: "conteudo-1783957078648-ynq8yhy",
                titulo: "numeral",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T15:37:58.648Z",
                atualizadoEm: "2026-07-13T15:37:58.648Z"
              },
              {
                id: "conteudo-1783957089182-j1qls60",
                titulo: "pronome",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T15:38:09.182Z",
                atualizadoEm: "2026-07-13T15:38:09.182Z"
              },
              {
                id: "conteudo-1783957096247-lg7hkb9",
                titulo: "verbo",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T15:38:16.247Z",
                atualizadoEm: "2026-07-13T15:38:16.247Z"
              },
              {
                id: "conteudo-1783957104593-rqep8i0",
                titulo: "advérbio",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T15:38:24.593Z",
                atualizadoEm: "2026-07-13T15:38:24.593Z"
              },
              {
                id: "conteudo-1783957111209-05vbwre",
                titulo: "preposição",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T15:38:31.209Z",
                atualizadoEm: "2026-07-13T15:38:31.209Z"
              },
              {
                id: "conteudo-1783957118270-0zgzoyo",
                titulo: "conjunção",
                observacao: "",
                status: "pendente",
                filhos: [],
                criadoEm: "2026-07-13T15:38:38.270Z",
                atualizadoEm: "2026-07-13T15:38:38.270Z"
              }
            ],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:38:38.270Z"
          },
          {
            id: "conteudo-1783956932056-olpbcki",
            titulo: "Concordância verbal e nominal",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-4owed7e",
            titulo: "Regência verbal e nominal",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-lsaonct",
            titulo: "Colocação pronominal",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-jga8fse",
            titulo: "Crase",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          },
          {
            id: "conteudo-1783956932056-3plqoac",
            titulo: "Pontuação",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T15:35:32.056Z",
            atualizadoEm: "2026-07-13T15:35:32.056Z"
          }
        ],
        criadoEm: "2026-07-13T15:35:32.055Z",
        atualizadoEm: "2026-07-13T15:38:38.270Z"
      },
      {
        id: "disciplina-1783962681308-gyo7p8x",
        nome: "Matemática",
        cor: "#1769aa",
        peso: 1,
        conteudos: [
          {
            id: "conteudo-1783962681308-01p86ln",
            titulo: "1. Operações com números reais",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-tsif2fs",
            titulo: "2. Mínimo múltiplo comum e máximo divisor comum",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-dg24a8m",
            titulo: "3. Razão e proporção",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-njzy38y",
            titulo: "4. Porcentagem",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-pkulyfj",
            titulo: "5. Regra de três simples e composta",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-i3fejsn",
            titulo: "6. Média aritmética simples e ponderada",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-9uaxszm",
            titulo: "7. Juros simples",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-qf4dvk9",
            titulo: "8. Equação do 1.º e 2.º graus",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-qavxbxc",
            titulo: "9. Sistema de equações do 1.º grau",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-x57o5uj",
            titulo: "10. Relação entre grandezas: tabelas e gráficos",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-r0hsmuh",
            titulo: "11. Sistemas de medidas usuais",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-7kod7bp",
            titulo: "12. Noções de geometria: forma, perímetro, área, volume, ângulo, teorema de Pitágoras",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          },
          {
            id: "conteudo-1783962681308-krmgchf",
            titulo: "13. Resolução de situações-problema",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-13T17:11:21.308Z",
            atualizadoEm: "2026-07-13T17:11:21.308Z"
          }
        ],
        criadoEm: "2026-07-13T17:11:21.308Z",
        atualizadoEm: "2026-07-13T17:11:21.308Z"
      },
      {
        id:"disciplina-1783973091503-f6645av",
        nome:"Informática",
        cor:"#c77d00",
        peso:1,
        conteudos:[
          {id:"conteudo-1783973091503-bkp7e7b",titulo:"'MS-Windows 10 ou superior",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-b9j08hw",titulo:"Conceito de pastas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-zfrv0en",titulo:"Conceito de diretórios",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-zxmsuu2",titulo:"Conceito de arquivos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-msvuscy",titulo:"Conceito de atalhos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-1jxjmys",titulo:"Área de trabalho",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-rsyh1to",titulo:"Área de transferência",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-166wig7",titulo:"Manipulação de arquivos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-cdegg8z",titulo:"Manipulação de pastas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-c5lrgs5",titulo:"Uso dos menus",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-2u9g3pn",titulo:"Programas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-sz5imif",titulo:"Aplicativos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-u464qro",titulo:"Microsoft 365",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ji3cdp5",titulo:"MS Word",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-bdizy06",titulo:"Estrutura básica dos documentos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-18xoc3k",titulo:"Edição de textos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-pnm79w8",titulo:"Formatação de textos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-3sn5ugg",titulo:"Cabeçalhos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-qzz7u7c",titulo:"Parágrafos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-jxc260n",titulo:"Fontes",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-af6sj7n",titulo:"Colunas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-39usi1p",titulo:"Marcadores simbólicos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ymgmakw",titulo:"Marcadores numéricos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-zh6hnk5",titulo:"Tabelas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-2rcbspf",titulo:"Impressão",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-4m8ztvb",titulo:"Controle de quebras",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-o32pyej",titulo:"Numeração de páginas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-jkmtl0w",titulo:"Legendas",observacao:"",status:"pendente","filhos":[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-x0ckg9w",titulo:"Índices",observacao:"",status:"pendente","filhos":[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-mvay76e",titulo:"Inserção de objetos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-19abu2o",titulo:"Campos predefinidos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-m6h23yn",titulo:"Caixas de texto",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-58jgghh",titulo:"Microsoft 365",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-6zpx9q2",titulo:"MS Excel",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-1u04voh",titulo:"Estrutura básica das planilhas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ir02pim",titulo:"Conceito de células",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-1ffkory",titulo:"Conceito de linhas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-wes2sj0",titulo:"Conceito de colunas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-fe2dcot",titulo:"Conceito de pastas de trabalho",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-s4kq27h",titulo:"Conceito de gráficos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ulsdtdr",titulo:"Elaboração de tabelas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-5vd9by5",titulo:"Elaboração de gráficos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-rdd1lg4",titulo:"Uso de fórmulas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-6g3ukaw",titulo:"Funções",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-e61tbjx",titulo:"Macros",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-imrdrng",titulo:"Impressão",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-i92i6q9",titulo:"Inserção de objetos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-abb1wah",titulo:"Campos predefinidos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-mzwdu3p",titulo:"Controle de quebras",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ql1z171",titulo:"Numeração de páginas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-fefwibh",titulo:"Obtenção de dados externos",observacao:"",status:"pendente","filhos":[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-dlfbmb0",titulo:"Classificação de dados",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-4sbuesx",titulo:"Correio Eletrônico",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-bikfp3w",titulo:"Uso de correio eletrônico",observacao:"",status:"pendente","filhos":[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ep31bkc",titulo:"Preparo de mensagens",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-i0s9w17",titulo:"Envio de mensagens",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-k2rhzov",titulo:"Anexação de arquivos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-e6j665n",titulo:"Internet",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-m5hsv3c",titulo:"Navegação na Internet",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-0rtyqom",titulo:"Conceito de URL",observacao:"","status":"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-rrk9tpp",titulo:"Links",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ql4jgw6",titulo:"Sites",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-z3v20x1",titulo:"Busca na Internet",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-du7utzq",titulo:"Impressão de páginas",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ivsz4ar",titulo:"Microsoft Teams",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ri0jeok",titulo:"Chats",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-unkhswr",titulo:"Chamadas de áudio",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-qtb0jnv",titulo:"Chamadas de vídeo",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-n2dij6t",titulo:"Criação de grupos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-1aw8ryq",titulo:"Trabalho em equipe",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-etbysnv",titulo:"Integração com Word",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-d9oln66",titulo:"Integração com Excel",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-2vd3iiq",titulo:"Integração com PowerPoint",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-zpi1t61",titulo:"Integração com SharePoint",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-ppcr1wi",titulo:"Integração com OneNote",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-qcpyzcq",titulo:"Agendamento de reuniões",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-r5va4yb",titulo:"Gravação de reuniões",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-5022va9",titulo:"OneDrive",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-vzp1rkh",titulo:"Armazenamento de arquivos",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"},
          {id:"conteudo-1783973091503-zknb2e6",titulo:"Compartilhamento de arquivos.",observacao:"",status:"pendente",filhos:[],criadoEm:"2026-07-13T20:04:51.503Z",atualizadoEm:"2026-07-13T20:04:51.503Z"}
        ],
        criadoEm:"2026-07-13T20:04:51.503Z",
        atualizadoEm:"2026-07-13T20:04:51.504Z"}
      ],
      criadoEm:"2026-07-10T14:08:35.900Z",
      atualizadoEm:"2026-07-13T20:04:51.504Z"
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
      id:"concurso-1784897195380-skj2xdk",
      titulo:"Concurso Dataprev",
      orgao:"DataPrev",
      banca:"FGV",
      cargo:"ANALISTA DE TECNOLOGIA DA INFORMAÇÃO",
      nivel:"superior",
      vagas:20,
      salario:10685,
      dataProva:"2026-10-11",
      dataInscricaoInicio:"2026-07-06",
      dataInscricaoFim:"2026-08-06",
      urlEdital:"https://conhecimento.fgv.br/sites/default/files/concursos/edital-dataprev_supe-versaofinal.pdf",
      observacoes:"",
      disciplinas:[
        {
          id:"disciplina-1784899336521-eq11dtw",
          nome:"Português",
          cor:"#1769aa",
          peso:12,
          conteudos: [
  {
    id: "conteudo-1784899336522-wshflly",
    titulo: "1 Compreensão e interpretação de textos de gêneros variados",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:22:16.522Z",
    atualizadoEm: "2026-07-24T13:22:16.522Z",
  },
  {
    id: "conteudo-1784899336522-g5v3hoo",
    titulo: "2 Reconhecimento de tipos e gêneros textuais",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:22:16.522Z",
    atualizadoEm: "2026-07-24T13:22:16.522Z",
  },
  {
    id: "conteudo-1784899336522-dpcsphp",
    titulo: "3 Domínio da ortografia oficial",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:22:16.522Z",
    atualizadoEm: "2026-07-24T13:22:16.522Z",
  },
  {
    id: "conteudo-1784899336522-w2bt9s1",
    titulo: `4 Domínio dos mecanismos de coesão textual 4.1 Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros elementos de sequenciação textual. 4.2 Emprego de tempos e modos verbais`,
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:22:16.522Z",
    atualizadoEm: "2026-07-24T13:22:16.522Z",
  },
  {
    id: "conteudo-1784899336522-73njeq5",
    titulo: "5 Domínio da estrutura morfossintática do período",
    observacao: "",
    status: "pendente",
    filhos: [
      {
        id: "conteudo-1784899376070-5v7ii43",
        titulo: "5.1 Emprego das classes de palavras.",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:22:56.070Z",
        atualizadoEm: "2026-07-24T13:22:56.070Z",
      },
      {
        id: "conteudo-1784899385138-zrqqo2e",
        titulo: "5.2 Relações de coordenação entre orações e entre termos da oração.",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:23:05.138Z",
        atualizadoEm: "2026-07-24T13:23:05.138Z",
      },
      {
        id: "conteudo-1784899392044-tpw238c",
        titulo: "5.3 Relações de subordinação entre orações e entre termos da oração",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:23:12.044Z",
        atualizadoEm: "2026-07-24T13:23:12.044Z",
      },
      {
        id: "conteudo-1784899400772-zo2oee3",
        titulo: "5.4 Emprego dos sinais de pontuação.",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:23:20.772Z",
        atualizadoEm: "2026-07-24T13:23:20.772Z",
      },
      {
        id: "conteudo-1784899409378-xasgraw",
        titulo: "5.5 Concordância verbal e nominal.",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:23:29.378Z",
        atualizadoEm: "2026-07-24T13:23:29.378Z",
      },
      {
        id: "conteudo-1784899415093-6wesl8a",
        titulo: "5.6 Regência verbal e nominal.",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:23:35.093Z",
        atualizadoEm: "2026-07-24T13:23:35.093Z",
      },
      {
        id: "conteudo-1784899424289-lz54ahh",
        titulo: "5.7 Emprego do sinal indicativo de crase",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:23:44.289Z",
        atualizadoEm: "2026-07-24T13:23:44.289Z",
      },
      {
        id: "conteudo-1784899430220-ejwjtbd",
        titulo: "5.8 Colocação dos pronomes átonos",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:23:50.220Z",
        atualizadoEm: "2026-07-24T13:23:50.220Z",
      },
    ],
    criadoEm: "2026-07-24T13:22:16.522Z",
    atualizadoEm: "2026-07-24T13:24:45.051Z",
  },
  {
    id: "conteudo-1784899336522-h7ad1w7",
    titulo: "6 Reescrita de frases e parágrafos do texto",
    observacao: "",
    status: "pendente",
    filhos: [
      {
        id: "conteudo-1784899439291-fpgvmdm",
        titulo: "6.1 Significação das palavras",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:23:59.291Z",
        atualizadoEm: "2026-07-24T13:23:59.291Z",
      },
      {
        id: "conteudo-1784899445719-1al83ma",
        titulo: "6.2 Substituição de palavras ou de trechos de texto.",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:24:05.719Z",
        atualizadoEm: "2026-07-24T13:24:05.719Z",
      },
      {
        id: "conteudo-1784899454696-31vni5p",
        titulo: "6.3 Reorganização da estrutura de orações e de períodos do texto.",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:24:14.696Z",
        atualizadoEm: "2026-07-24T13:24:14.696Z",
      },
      {
        id: "conteudo-1784899460352-3d2rshr",
        titulo: "6.4 Reescrita de textos de diferentes gêneros e níveis de formalidade.",
        observacao: "",
        status: "pendente",
        filhos: [],
        criadoEm: "2026-07-24T13:24:20.352Z",
        atualizadoEm: "2026-07-24T13:24:20.352Z",
      },
    ],
    criadoEm: "2026-07-24T13:22:16.522Z",
            atualizadoEm: "2026-07-24T13:24:30.947Z",
          },
        ],
          criadoEm:"2026-07-24T13:22:16.521Z",
          atualizadoEm:"2026-07-24T14:09:35.661Z"
        },
        {
          id:"disciplina-1784899668982-0sy946x",
          nome:"Raciocinio Lógico",
          cor:"#1f9d76",
          peso:5,
          conteudos: [
          {
            id: "conteudo-1784899668983-f8t1blo",
            titulo: "Estruturas lógicas",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-24T13:27:48.983Z",
            atualizadoEm: "2026-07-24T13:27:48.983Z",
          },
          {
            id: "conteudo-1784899668983-gnuhum5",
            titulo: "Lógica de argumentação: analogias, inferências, deduções e conclusões",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-24T13:27:48.983Z",
            atualizadoEm: "2026-07-24T13:27:48.983Z",
          },
          {
            id: "conteudo-1784899668983-x8m3y8t",
            titulo: "Lógica sentencial (ou proposicional)",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-24T13:27:48.983Z",
            atualizadoEm: "2026-07-24T13:27:48.983Z",
          },
          {
            id: "conteudo-1784899668983-n68d03q",
            titulo: "Proposições simples e compostas",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-24T13:27:48.983Z",
            atualizadoEm: "2026-07-24T13:27:48.983Z",
          },
          {
            id: "conteudo-1784899668983-yn4r0xa",
            titulo: "Tabelas-verdade",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-24T13:27:48.983Z",
            atualizadoEm: "2026-07-24T13:27:48.983Z",
          },
          {
            id: "conteudo-1784899668983-fnnimr4",
            titulo: "Equivalências",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-24T13:27:48.983Z",
            atualizadoEm: "2026-07-24T13:27:48.983Z",
          },
          {
            id: "conteudo-1784899668983-lrbi4ji",
            titulo: "Diagramas lógicos",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-24T13:27:48.983Z",
            atualizadoEm: "2026-07-24T13:27:48.983Z",
          },
          {
            id: "conteudo-1784899668983-yggb5f0",
            titulo: "Lógica de primeira ordem",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-24T13:27:48.983Z",
            atualizadoEm: "2026-07-24T13:27:48.983Z",
          },
          {
            id: "conteudo-1784899668983-7pq6kzz",
            titulo: "Raciocínio lógico envolvendo problemas aritméticos, geométricos e matriciais",
            observacao: "",
            status: "pendente",
            filhos: [],
            criadoEm: "2026-07-24T13:27:48.983Z",
            atualizadoEm: "2026-07-24T13:27:48.983Z",
          },
          ],
          criadoEm:"2026-07-24T13:27:48.982Z",
          atualizadoEm:"2026-07-24T14:07:51.859Z"
        },
        {
          id:"disciplina-1784899832103-jw4higu",
          nome:"ATUALIDADES E INTELIGÊNCIA ARTIFICIAL:",
          cor:"#1769aa",
          peso:6,
          conteudos:
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
          criadoEm:"2026-07-24T13:30:32.103Z",
          atualizadoEm:"2026-07-24T14:07:28.944Z"
        },
        {
          id:"disciplina-1784899991437-8nf9edx",
          nome:"LEGISLAÇÃO ACERCA DE SEGURANÇA DA INFORMAÇÃO E PROTEÇÃO DE DADOS",
          cor:"#1769aa",
          peso:5,
         conteudos: [
  {
    id: "conteudo-1784899991437-uh455fn",
    titulo: "Lei nº 12.527/2011 (Lei de Acesso à Informação): capítulos I, II, III, IV e V",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-ow3jnbj",
    titulo: "Decreto nº 7.724",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-4xcjech",
    titulo: "Decreto nº 7.845",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-ge1phjd",
    titulo: "Lei nº 12.737/2012 (Lei de Delitos Informáticos): art. 2º",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-t43o4vd",
    titulo: "Lei nº 12.965/2014 (Marco Civil da Internet): capítulo II, Seção I",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-wghgx0n",
    titulo: "Lei nº 12.965/2014 (Marco Civil da Internet): capítulo III, Seções I e II",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-5b6j7se",
    titulo: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo I",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-ltmmhwr",
    titulo: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo II",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-zbkm8eq",
    titulo: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo III",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-lkbfbhv",
    titulo: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo IV",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-s3vwtdq",
    titulo: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo VII",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-fpiz3er",
    titulo: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo VIII",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
  {
    id: "conteudo-1784899991437-t8y6rq0",
    titulo: "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD): capítulo IX",
    observacao: "",
    status: "pendente",
    filhos: [],
    criadoEm: "2026-07-24T13:33:11.437Z",
    atualizadoEm: "2026-07-24T13:33:11.437Z",
  },
],
          criadoEm:"2026-07-24T13:33:11.437Z",
          atualizadoEm:"2026-07-24T14:07:50.541Z"
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
          id: "disciplina-1784900418858-slbvoul",
          nome: "INTELIGÊNCIA DE NEGÓCIOS (BUSINESS INTELLIGENCE)",
          cor: "#1769aa",
          peso: 15,
          conteudos: [
            {
              id: "conteudo-1784900418858-r2svmlh",
              titulo: "Conceitos de Business Intelligence (BI)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-ej5b7go",
              titulo: "Fundamentos de Business Intelligence (BI)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-tvi7ium",
              titulo: "Características de Business Intelligence (BI)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-55rbhg6",
              titulo: "Técnicas de Business Intelligence (BI)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-r58hprh",
              titulo: "Métodos de Business Intelligence (BI)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-v63d8v6",
              titulo: "Sistemas de Suporte à Decisão (DSS)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-zfdf4f8",
              titulo: "Gestão de conteúdo",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-37bmryx",
              titulo: "Arquitetura de Data Warehouse",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-sxyrpxf",
              titulo: "ETL (Extract, Transform and Load)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-tqqqprx",
              titulo: "OLAP (Online Analytical Processing)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-mlxp1u0",
              titulo: "Conceitos de Data Warehouse",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-jbj24m2",
              titulo: "Conceitos de Data Mining",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-wkjscjg",
              titulo: "Visualização de dados",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-rwa0yp1",
              titulo: "Bancos de Dados individuais",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-2xb9eue",
              titulo: "Cubos OLAP",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-8nu50ak",
              titulo: "Mapeamento de fontes de dados",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-nyfdc0i",
              titulo: "Técnicas de coleta de dados",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
            {
              id: "conteudo-1784900418858-6rzo0ae",
              titulo: "Arquitetura de Business Intelligence (BI)",
              observacao: "",
              status: "pendente",
              filhos: [],
              criadoEm: "2026-07-24T13:40:18.858Z",
              atualizadoEm: "2026-07-24T13:40:18.858Z",
            },
          ],
          criadoEm: "2026-07-24T13:40:18.858Z",
          atualizadoEm: "2026-07-24T14:08:48.198Z",
        },
       {
  id: "disciplina-1784900499463-m1qtveu",
  nome: "SEGURANÇA DA INFORMAÇÃO",
  cor: "#1769aa",
  peso: 15,
  conteudos: [
    {
      id: "conteudo-1784900499463-g56y57v",
      titulo: "Políticas de segurança da informação",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-o7fu2e6",
      titulo: "Procedimentos de segurança",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-luc2hkr",
      titulo: "Conceitos gerais de gerenciamento de segurança",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-9qpudcz",
      titulo: "ABNT NBR ISO/IEC 27001:2022",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-ujiqd4p",
      titulo: "ABNT NBR ISO/IEC 27002:2022",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-bg6d7fs",
      titulo: "Confiabilidade",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-cvgxzpn",
      titulo: "Integridade",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-ops8ave",
      titulo: "Disponibilidade",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-nxgedeh",
      titulo: "Mecanismos de segurança",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-i7a55bn",
      titulo: "Controle de acesso",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-zvazi7u",
      titulo: "OAuth 2.0",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-6ca8r1w",
      titulo: "SSO (Single Sign-On)",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-s1gxz8c",
      titulo: "Gerência de riscos",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-5wvcna4",
      titulo: "Ameaças",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-bwrqid0",
      titulo: "Vulnerabilidades",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-x6bebfg",
      titulo: "Impacto de riscos",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-ygj370y",
      titulo: "Ciclo de Vida de Desenvolvimento Seguro (SDL – Security Development Lifecycle)",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-jhuvtuj",
      titulo: "OWASP Top 10",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-ubq3nnh",
      titulo: "Análise Estática de Segurança de Aplicações (SAST)",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
    {
      id: "conteudo-1784900499463-z4avphm",
      titulo: "Análise Dinâmica de Segurança de Aplicações (DAST)",
      observacao: "",
      status: "pendente",
      filhos: [],
      criadoEm: "2026-07-24T13:41:39.463Z",
      atualizadoEm: "2026-07-24T13:41:39.463Z",
    },
  ],
  criadoEm: "2026-07-24T13:41:39.463Z",
  atualizadoEm: "2026-07-24T14:08:50.011Z",
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
      criadoEm:"2026-07-24T12:46:35.380Z",
      atualizadoEm:"2026-07-24T14:09:35.661Z"
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
        console.log(JSON.stringify(estado.concursos[1]));
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
