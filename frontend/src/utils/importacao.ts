import type { AppConcursoState } from "../types/legado";
import type { Dados, TipoCronograma, ConteudoRow } from "../types";
import { ATIVIDADES, NIVEIS, dadosVazios } from "../types";
import type { Conteudo as ConteudoLegado } from "../types/legado";

export const CHAVE_LOCALSTORAGE_LEGADA = "gestao-concursos:estado";

const uuid = () => crypto.randomUUID();

const dataOuVazio = (v: unknown) =>
  typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 10) : "";

const corValida = (v: unknown) =>
  typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v : "#2563eb";

/** Lê o estado que a versão antiga salvava no navegador (se existir). */
export function lerLocalStorageLegado(): AppConcursoState | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE_LOCALSTORAGE_LEGADA);
    if (!bruto) return null;
    const estado = JSON.parse(bruto);
    if (!estado || !Array.isArray(estado.concursos) || estado.concursos.length === 0) return null;
    return estado as AppConcursoState;
  } catch {
    return null;
  }
}

/**
 * Converte o formato antigo (ids de texto, árvore aninhada) para linhas planas
 * com UUIDs novos, prontas para gravar no banco.
 */
export function converterLegado(estado: AppConcursoState): Dados {
  const dados = dadosVazios();
  const mapaConcurso = new Map<string, string>();
  const mapaDisciplina = new Map<string, string>();
  const mapaConteudo = new Map<string, string>();

  estado.concursos.forEach((c) => {
    const id = uuid();
    mapaConcurso.set(c.id, id);
    dados.concursos.push({
      id,
      titulo: (c.titulo || "Concurso").trim() || "Concurso",
      orgao: c.orgao ?? "",
      banca: c.banca ?? "",
      cargo: c.cargo ?? "",
      nivel: NIVEIS.includes(c.nivel) ? c.nivel : "superior",
      vagas: Math.max(0, Number(c.vagas) || 0),
      salario: Math.max(0, Number(c.salario) || 0),
      dataProva: dataOuVazio(c.dataProva),
      dataInscricaoInicio: dataOuVazio(c.dataInscricaoInicio),
      dataInscricaoFim: dataOuVazio(c.dataInscricaoFim),
      urlEdital: c.urlEdital ?? "",
      observacoes: c.observacoes ?? "",
      metaHorasSemana: 20,
    });

    (c.disciplinas ?? []).forEach((d, indiceDisciplina) => {
      const disciplinaId = uuid();
      mapaDisciplina.set(d.id, disciplinaId);
      dados.disciplinas.push({
        id: disciplinaId,
        concursoId: id,
        nome: (d.nome || "Disciplina").trim() || "Disciplina",
        cor: corValida(d.cor),
        peso: Math.min(1000, Math.max(0, Number(d.peso) || 0)),
        ordem: indiceDisciplina,
      });

      const percorrer = (itens: ConteudoLegado[], parentId: string | null) => {
        itens.forEach((item, ordem) => {
          const conteudoId = uuid();
          mapaConteudo.set(item.id, conteudoId);
          const linha: ConteudoRow = {
            id: conteudoId,
            concursoId: id,
            disciplinaId,
            parentId,
            titulo: (item.titulo || "Conteúdo").trim() || "Conteúdo",
            observacao: item.observacao ?? "",
            status: item.status === "concluido" || item.status === "em_estudo" ? item.status : "pendente",
            ordem,
          };
          dados.conteudos.push(linha);
          percorrer(item.filhos ?? [], conteudoId);
        });
      };
      percorrer(d.conteudos ?? [], null);
    });
  });

  (estado.cronograma ?? []).forEach((item) => {
    const concursoId = mapaConcurso.get(item.concursoId);
    if (!concursoId || !dataOuVazio(item.data)) return;
    dados.cronograma.push({
      id: uuid(),
      concursoId,
      disciplinaId: (item.disciplinaId && mapaDisciplina.get(item.disciplinaId)) || null,
      conteudoId: (item.conteudoId && mapaConteudo.get(item.conteudoId)) || null,
      data: dataOuVazio(item.data),
      horario: item.horario || "19:00",
      duracaoMinutos: Math.min(1440, Math.max(5, Number(item.duracaoMinutos) || 60)),
      titulo: item.titulo || "Estudo",
      descricao: "",
      tipo: "teoria" as TipoCronograma,
      concluido: Boolean(item.concluido),
    });
  });

  (estado.registrosEstudo ?? []).forEach((r) => {
    const concursoId = mapaConcurso.get(r.concursoId);
    if (!concursoId || !dataOuVazio(r.data)) return;
    dados.registros.push({
      id: uuid(),
      concursoId,
      disciplinaId: (r.disciplinaId && mapaDisciplina.get(r.disciplinaId)) || null,
      conteudoId: (r.conteudoId && mapaConteudo.get(r.conteudoId)) || null,
      cronogramaItemId: null,
      data: dataOuVazio(r.data),
      minutos: Math.min(1440, Math.max(1, Math.round(Number(r.minutos) || 1))),
      atividades: [],
      questoesFeitas: 0,
      questoesAcertos: 0,
      foco: null,
      anotacao: r.anotacao ?? "",
      iniciadoEm: null,
      criadoEm: r.criadoEm || new Date().toISOString(),
    });
  });

  return dados;
}

/* ------------------------- backup em arquivo JSON ------------------------- */

export interface ArquivoBackup {
  formato: "estudos-concursos";
  versao: 1;
  exportadoEm: string;
  dados: Dados;
}

export const gerarBackup = (dados: Dados): ArquivoBackup => ({
  formato: "estudos-concursos",
  versao: 1,
  exportadoEm: new Date().toISOString(),
  dados,
});

/** Aceita backup novo ou o estado antigo do localStorage. Gera ids novos para evitar conflito. */
export function interpretarArquivo(texto: string): Dados {
  const json = JSON.parse(texto);

  if (json?.formato === "estudos-concursos" && json.dados) {
    return reidentificar(json.dados as Dados);
  }
  if (Array.isArray(json?.concursos) && json.concursos.some((c: { disciplinas?: unknown }) => Array.isArray(c.disciplinas))) {
    return converterLegado(json as AppConcursoState);
  }
  throw new Error("Arquivo não reconhecido. Use um backup exportado por este aplicativo.");
}

function reidentificar(origem: Dados): Dados {
  const mapa = new Map<string, string>();
  const novo = (id: string) => {
    if (!mapa.has(id)) mapa.set(id, uuid());
    return mapa.get(id)!;
  };
  const ref = (id: string | null) => (id ? novo(id) : null);
  return {
    concursos: origem.concursos.map((c) => ({ ...c, id: novo(c.id) })),
    disciplinas: origem.disciplinas.map((d) => ({ ...d, id: novo(d.id), concursoId: novo(d.concursoId) })),
    conteudos: origem.conteudos.map((c) => ({
      ...c,
      id: novo(c.id),
      concursoId: novo(c.concursoId),
      disciplinaId: novo(c.disciplinaId),
      parentId: ref(c.parentId),
    })),
    cronograma: origem.cronograma.map((i) => ({
      ...i,
      id: novo(i.id),
      concursoId: novo(i.concursoId),
      disciplinaId: ref(i.disciplinaId),
      conteudoId: ref(i.conteudoId),
    })),
    registros: origem.registros.map((r) => ({
      ...r,
      id: novo(r.id),
      concursoId: novo(r.concursoId),
      disciplinaId: ref(r.disciplinaId),
      conteudoId: ref(r.conteudoId),
      cronogramaItemId: ref(r.cronogramaItemId),
      atividades: (r.atividades ?? []).filter((a) => ATIVIDADES.includes(a)),
    })),
  };
}
