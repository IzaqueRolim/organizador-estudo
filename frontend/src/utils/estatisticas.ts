import type {
  ConcursoBase,
  Concurso,
  Conteudo,
  ConteudoRow,
  CronogramaItem,
  Dados,
  Disciplina,
  DisciplinaRow,
  RegistroEstudo,
} from "../types";
import { diasAteProva, diferencaEmDias, hojeIso, somarDias } from "./datas";

/* ------------------------------ árvore ------------------------------ */

export function montarArvore(linhas: ConteudoRow[]): Conteudo[] {
  const nos = new Map<string, Conteudo>();
  linhas.forEach((l) => nos.set(l.id, { ...l, filhos: [] }));
  const raizes: Conteudo[] = [];
  const ordenadas = [...linhas].sort((a, b) => a.ordem - b.ordem);
  ordenadas.forEach((l) => {
    const no = nos.get(l.id)!;
    const pai = l.parentId ? nos.get(l.parentId) : undefined;
    if (pai) pai.filhos.push(no);
    else raizes.push(no);
  });
  return raizes;
}

export function montarConcursos(dados: Dados): Concurso[] {
  const conteudosPorDisciplina = new Map<string, ConteudoRow[]>();
  dados.conteudos.forEach((c) => {
    const lista = conteudosPorDisciplina.get(c.disciplinaId) ?? [];
    lista.push(c);
    conteudosPorDisciplina.set(c.disciplinaId, lista);
  });
  const disciplinasPorConcurso = new Map<string, DisciplinaRow[]>();
  dados.disciplinas.forEach((d) => {
    const lista = disciplinasPorConcurso.get(d.concursoId) ?? [];
    lista.push(d);
    disciplinasPorConcurso.set(d.concursoId, lista);
  });

  return dados.concursos.map((c: ConcursoBase) => ({
    ...c,
    disciplinas: (disciplinasPorConcurso.get(c.id) ?? [])
      .sort((a, b) => a.ordem - b.ordem)
      .map(
        (d): Disciplina => ({
          ...d,
          conteudos: montarArvore(conteudosPorDisciplina.get(d.id) ?? []),
        }),
      ),
  }));
}

export const listarConteudos = (conteudos: Conteudo[]): Conteudo[] =>
  conteudos.flatMap((c) => [c, ...listarConteudos(c.filhos)]);

/** Lista com o caminho completo ("Pai › Filho") para selects. */
export const listarConteudosComCaminho = (
  conteudos: Conteudo[],
  prefixo = "",
): Array<{ conteudo: Conteudo; caminho: string; nivel: number }> =>
  conteudos.flatMap((c) => {
    const caminho = prefixo ? `${prefixo} › ${c.titulo}` : c.titulo;
    return [
      { conteudo: c, caminho, nivel: prefixo ? prefixo.split("›").length : 0 },
      ...listarConteudosComCaminho(c.filhos, caminho),
    ];
  });

export interface ContagemConteudos {
  total: number;
  concluidos: number;
  emEstudo: number;
  pendentes: number;
  percentual: number;
}

export function contarConteudos(conteudos: Conteudo[]): ContagemConteudos {
  const todos = listarConteudos(conteudos);
  const concluidos = todos.filter((c) => c.status === "concluido").length;
  const emEstudo = todos.filter((c) => c.status === "em_estudo").length;
  return {
    total: todos.length,
    concluidos,
    emEstudo,
    pendentes: todos.length - concluidos - emEstudo,
    percentual: todos.length ? Math.round((concluidos / todos.length) * 100) : 0,
  };
}

export function contarConcurso(concurso: Concurso): ContagemConteudos {
  const partes = concurso.disciplinas.map((d) => contarConteudos(d.conteudos));
  const total = partes.reduce((s, p) => s + p.total, 0);
  const concluidos = partes.reduce((s, p) => s + p.concluidos, 0);
  const emEstudo = partes.reduce((s, p) => s + p.emEstudo, 0);
  return {
    total,
    concluidos,
    emEstudo,
    pendentes: total - concluidos - emEstudo,
    percentual: total ? Math.round((concluidos / total) * 100) : 0,
  };
}

/* -------------------------- pesos e horas -------------------------- */

export type ModoDistribuicao = "peso" | "ajustado";

export interface FatiaDisciplina {
  disciplina: Disciplina;
  /** participação no tempo de estudo, de 0 a 1 */
  fracao: number;
  horasSemana: number;
  horasEstudadasSemana: number;
  horasTotaisEstudadas: number;
  horasAteProva: number;
  contagem: ContagemConteudos;
}

export const minutosNoPeriodo = (
  registros: RegistroEstudo[],
  de: string,
  ate: string,
  disciplinaId?: string,
) =>
  registros
    .filter(
      (r) =>
        r.data >= de && r.data <= ate && (disciplinaId === undefined || r.disciplinaId === disciplinaId),
    )
    .reduce((s, r) => s + r.minutos, 0);

export function semanasAteProva(dataProva: string): number | null {
  const dias = diasAteProva(dataProva);
  if (dias === null || dias < 0) return null;
  return Math.max(dias / 7, 0);
}

/**
 * Divide a meta semanal entre as disciplinas.
 *  - "peso": proporcional ao peso informado.
 *  - "ajustado": proporcional ao peso × quanto ainda falta estudar (nunca zera,
 *    para não abandonar a revisão de disciplinas quase concluídas).
 */
export function calcularDistribuicao(
  concurso: Concurso,
  registros: RegistroEstudo[],
  modo: ModoDistribuicao,
  referencia = hojeIso(),
): FatiaDisciplina[] {
  const inicioJanela = somarDias(referencia, -6);
  const semanas = semanasAteProva(concurso.dataProva);

  const pontuacoes = concurso.disciplinas.map((d) => {
    const contagem = contarConteudos(d.conteudos);
    const faltando = contagem.total ? (contagem.total - contagem.concluidos) / contagem.total : 1;
    const fator = modo === "ajustado" ? 0.25 + 0.75 * faltando : 1;
    return { d, contagem, pontos: d.peso * fator };
  });
  const soma = pontuacoes.reduce((s, p) => s + p.pontos, 0);

  return pontuacoes.map(({ d, contagem, pontos }) => {
    const fracao = soma > 0 ? pontos / soma : 0;
    const horasSemana = concurso.metaHorasSemana * fracao;
    return {
      disciplina: d,
      fracao,
      horasSemana,
      horasEstudadasSemana: minutosNoPeriodo(registros, inicioJanela, referencia, d.id) / 60,
      horasTotaisEstudadas: registros.filter((r) => r.disciplinaId === d.id).reduce((s, r) => s + r.minutos, 0) / 60,
      horasAteProva: semanas === null ? 0 : horasSemana * semanas,
      contagem,
    };
  });
}

/* ------------------------- hábitos e desempenho ------------------------- */

export function minutosPorDia(registros: RegistroEstudo[]): Map<string, number> {
  const mapa = new Map<string, number>();
  registros.forEach((r) => mapa.set(r.data, (mapa.get(r.data) ?? 0) + r.minutos));
  return mapa;
}

/** Dias seguidos estudando (hoje ainda não estudado não quebra a sequência). */
export function sequenciaDeDias(registros: RegistroEstudo[], hoje = hojeIso()) {
  const porDia = minutosPorDia(registros);
  let dia = porDia.has(hoje) ? hoje : somarDias(hoje, -1);
  let n = 0;
  while (porDia.has(dia)) {
    n++;
    dia = somarDias(dia, -1);
  }
  return n;
}

export function desempenhoQuestoes(registros: RegistroEstudo[]) {
  const feitas = registros.reduce((s, r) => s + r.questoesFeitas, 0);
  const acertos = registros.reduce((s, r) => s + r.questoesAcertos, 0);
  return { feitas, acertos, taxa: feitas ? Math.round((acertos / feitas) * 100) : null };
}

/* ----------------------------- cronograma ----------------------------- */

export const ordenarCronograma = <T extends Pick<CronogramaItem, "data" | "horario">>(itens: T[]) =>
  [...itens].sort((a, b) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario));

export const minutosPlanejados = (itens: CronogramaItem[]) =>
  itens.reduce((s, i) => s + i.duracaoMinutos, 0);

export const estaAtrasado = (item: CronogramaItem, hoje = hojeIso()) =>
  !item.concluido && item.data < hoje;

export const diasEntre = diferencaEmDias;

export function encontrarConteudoPorId(concurso: Concurso, id: string | null): Conteudo | undefined {
  if (!id) return undefined;
  for (const d of concurso.disciplinas) {
    const achado = listarConteudos(d.conteudos).find((c) => c.id === id);
    if (achado) return achado;
  }
  return undefined;
}
