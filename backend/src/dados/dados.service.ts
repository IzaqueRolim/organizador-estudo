import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../prisma/prisma.service";
import {
  AtualizarConcursoDto,
  AtualizarConteudoDto,
  AtualizarCronogramaDto,
  AtualizarDisciplinaDto,
  AtualizarRegistroDto,
  ConcursoDto,
  ConteudoDto,
  CronogramaDto,
  DisciplinaDto,
  PacoteDto,
  RegistroDto,
} from "./dto";

const LIMITE_LOTE = 5000;
const TAMANHO_CHUNK = 1000;

/** "AAAA-MM-DD" → Date (meia-noite UTC, como o tipo DATE do Postgres); vazio → null */
const paraData = (s?: string | null) => (s ? new Date(`${s}T00:00:00.000Z`) : null);
const deData = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : "");

/** Remove as chaves não informadas, para que PATCH só altere o que veio no corpo. */
const definidos = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;

@Injectable()
export class DadosService {
  constructor(private readonly prisma: PrismaService) {}

  /* ------------------------------ leitura ------------------------------ */

  /** Tudo do usuário de uma vez, já no formato que o frontend usa. */
  async carregar(userId: string) {
    const [concursos, disciplinas, conteudos, cronograma, registros] = await Promise.all([
      this.prisma.concurso.findMany({ where: { userId }, orderBy: [{ createdAt: "asc" }, { id: "asc" }] }),
      this.prisma.disciplina.findMany({ where: { userId }, orderBy: [{ ordem: "asc" }, { id: "asc" }] }),
      this.prisma.conteudo.findMany({ where: { userId }, orderBy: [{ ordem: "asc" }, { id: "asc" }] }),
      this.prisma.cronogramaItem.findMany({ where: { userId }, orderBy: [{ data: "asc" }, { horario: "asc" }, { id: "asc" }] }),
      this.prisma.registroEstudo.findMany({ where: { userId }, orderBy: [{ data: "asc" }, { createdAt: "asc" }, { id: "asc" }] }),
    ]);

    return {
      concursos: concursos.map((c) => ({
        id: c.id,
        titulo: c.titulo,
        orgao: c.orgao,
        banca: c.banca,
        cargo: c.cargo,
        nivel: c.nivel,
        vagas: c.vagas,
        salario: Number(c.salario),
        dataProva: deData(c.dataProva),
        dataInscricaoInicio: deData(c.dataInscricaoInicio),
        dataInscricaoFim: deData(c.dataInscricaoFim),
        urlEdital: c.urlEdital,
        observacoes: c.observacoes,
        metaHorasSemana: Number(c.metaHorasSemana),
      })),
      disciplinas: disciplinas.map((d) => ({
        id: d.id,
        concursoId: d.concursoId,
        nome: d.nome,
        cor: d.cor,
        peso: Number(d.peso),
        ordem: d.ordem,
      })),
      conteudos: conteudos.map((c) => ({
        id: c.id,
        concursoId: c.concursoId,
        disciplinaId: c.disciplinaId,
        parentId: c.parentId,
        titulo: c.titulo,
        observacao: c.observacao,
        status: c.status,
        ordem: c.ordem,
      })),
      cronograma: cronograma.map((i) => ({
        id: i.id,
        concursoId: i.concursoId,
        disciplinaId: i.disciplinaId,
        conteudoId: i.conteudoId,
        data: deData(i.data),
        horario: i.horario,
        duracaoMinutos: i.duracaoMinutos,
        titulo: i.titulo,
        descricao: i.descricao,
        tipo: i.tipo,
        concluido: i.concluido,
      })),
      registros: registros.map((r) => ({
        id: r.id,
        concursoId: r.concursoId,
        disciplinaId: r.disciplinaId,
        conteudoId: r.conteudoId,
        cronogramaItemId: r.cronogramaItemId,
        data: deData(r.data),
        minutos: r.minutos,
        atividades: r.atividades,
        questoesFeitas: r.questoesFeitas,
        questoesAcertos: r.questoesAcertos,
        foco: r.foco,
        anotacao: r.anotacao,
        iniciadoEm: r.iniciadoEm ? r.iniciadoEm.toISOString() : null,
        criadoEm: r.createdAt.toISOString(),
      })),
    };
  }

  /* ---------------------- verificação de "é do usuário" ---------------------- */

  private limitar(lista: unknown[]) {
    if (lista.length === 0) throw new BadRequestException("Nenhum item enviado.");
    if (lista.length > LIMITE_LOTE) throw new BadRequestException(`Envie no máximo ${LIMITE_LOTE} itens por vez.`);
  }

  private async concursosDoUsuario(userId: string, ids: Array<string | null | undefined>) {
    const unicos = [...new Set(ids.filter((x): x is string => Boolean(x)))];
    if (!unicos.length) return new Set<string>();
    const linhas = await this.prisma.concurso.findMany({ where: { id: { in: unicos }, userId }, select: { id: true } });
    return new Set(linhas.map((l) => l.id));
  }

  /** id da disciplina → id do concurso */
  private async disciplinasDoUsuario(userId: string, ids: Array<string | null | undefined>) {
    const unicos = [...new Set(ids.filter((x): x is string => Boolean(x)))];
    if (!unicos.length) return new Map<string, string>();
    const linhas = await this.prisma.disciplina.findMany({
      where: { id: { in: unicos }, userId },
      select: { id: true, concursoId: true },
    });
    return new Map(linhas.map((l) => [l.id, l.concursoId]));
  }

  /** id do conteúdo → { concurso, disciplina } */
  private async conteudosDoUsuario(userId: string, ids: Array<string | null | undefined>) {
    const unicos = [...new Set(ids.filter((x): x is string => Boolean(x)))];
    if (!unicos.length) return new Map<string, { concursoId: string; disciplinaId: string }>();
    const linhas = await this.prisma.conteudo.findMany({
      where: { id: { in: unicos }, userId },
      select: { id: true, concursoId: true, disciplinaId: true },
    });
    return new Map(linhas.map((l) => [l.id, { concursoId: l.concursoId, disciplinaId: l.disciplinaId }]));
  }

  private async cronogramaDoUsuario(userId: string, ids: Array<string | null | undefined>) {
    const unicos = [...new Set(ids.filter((x): x is string => Boolean(x)))];
    if (!unicos.length) return new Map<string, string>();
    const linhas = await this.prisma.cronogramaItem.findMany({
      where: { id: { in: unicos }, userId },
      select: { id: true, concursoId: true },
    });
    return new Map(linhas.map((l) => [l.id, l.concursoId]));
  }

  private invalido(que: string): never {
    throw new BadRequestException(`Referência inválida: ${que} não existe ou não pertence a você.`);
  }

  /* ------------------------------- concursos ------------------------------- */

  private dadosConcurso(d: Partial<ConcursoDto>) {
    return definidos({
      titulo: d.titulo?.trim(),
      orgao: d.orgao,
      banca: d.banca,
      cargo: d.cargo,
      nivel: d.nivel,
      vagas: d.vagas,
      salario: d.salario,
      dataProva: d.dataProva === undefined ? undefined : paraData(d.dataProva),
      dataInscricaoInicio: d.dataInscricaoInicio === undefined ? undefined : paraData(d.dataInscricaoInicio),
      dataInscricaoFim: d.dataInscricaoFim === undefined ? undefined : paraData(d.dataInscricaoFim),
      urlEdital: d.urlEdital,
      observacoes: d.observacoes,
      metaHorasSemana: d.metaHorasSemana,
    });
  }

  async criarConcursos(userId: string, itens: ConcursoDto[]) {
    this.limitar(itens);
    await this.prisma.concurso.createMany({
      data: itens.map((c) => ({ ...(this.dadosConcurso(c) as { titulo: string }), id: c.id ?? randomUUID(), userId })),
    });
  }

  async atualizarConcurso(userId: string, id: string, dto: AtualizarConcursoDto) {
    const r = await this.prisma.concurso.updateMany({ where: { id, userId }, data: this.dadosConcurso(dto) });
    if (r.count === 0) throw new NotFoundException("Concurso não encontrado.");
  }

  async removerConcurso(userId: string, id: string) {
    const r = await this.prisma.concurso.deleteMany({ where: { id, userId } });
    if (r.count === 0) throw new NotFoundException("Concurso não encontrado.");
  }

  /* ------------------------------ disciplinas ------------------------------ */

  async criarDisciplinas(userId: string, itens: DisciplinaDto[]) {
    this.limitar(itens);
    const donos = await this.concursosDoUsuario(userId, itens.map((i) => i.concursoId));
    if (itens.some((i) => !donos.has(i.concursoId))) this.invalido("concurso");
    await this.prisma.disciplina.createMany({
      data: itens.map((d) => ({
        id: d.id ?? randomUUID(),
        userId,
        concursoId: d.concursoId,
        nome: d.nome.trim(),
        ...definidos({ cor: d.cor, peso: d.peso, ordem: d.ordem }),
      })),
    });
  }

  async atualizarDisciplina(userId: string, id: string, dto: AtualizarDisciplinaDto) {
    const r = await this.prisma.disciplina.updateMany({
      where: { id, userId },
      data: definidos({ ...dto, nome: dto.nome?.trim() }),
    });
    if (r.count === 0) throw new NotFoundException("Disciplina não encontrada.");
  }

  async removerDisciplina(userId: string, id: string) {
    const r = await this.prisma.disciplina.deleteMany({ where: { id, userId } });
    if (r.count === 0) throw new NotFoundException("Disciplina não encontrada.");
  }

  /* ------------------------------- conteúdos ------------------------------- */

  async criarConteudos(userId: string, itens: ConteudoDto[]) {
    this.limitar(itens);
    const disciplinas = await this.disciplinasDoUsuario(userId, itens.map((i) => i.disciplinaId));
    if (itens.some((i) => !disciplinas.has(i.disciplinaId))) this.invalido("disciplina");

    const comId = itens.map((i) => ({ ...i, id: i.id ?? randomUUID() }));
    const noLote = new Map(comId.map((i) => [i.id, i.disciplinaId]));
    const forasDoLote = comId.map((i) => i.parentId).filter((p): p is string => Boolean(p) && !noLote.has(p as string));
    const paisExistentes = await this.conteudosDoUsuario(userId, forasDoLote);

    for (const i of comId) {
      if (!i.parentId) continue;
      const disciplinaDoPai = noLote.get(i.parentId) ?? paisExistentes.get(i.parentId)?.disciplinaId;
      if (disciplinaDoPai !== i.disciplinaId) this.invalido("conteúdo pai");
    }

    await this.prisma.conteudo.createMany({
      data: comId.map((c) => ({
        id: c.id,
        userId,
        concursoId: disciplinas.get(c.disciplinaId)!,
        disciplinaId: c.disciplinaId,
        parentId: c.parentId ?? null,
        titulo: c.titulo.trim(),
        ...definidos({ observacao: c.observacao, status: c.status, ordem: c.ordem }),
      })),
    });
  }

  async atualizarConteudo(userId: string, id: string, dto: AtualizarConteudoDto) {
    const r = await this.prisma.conteudo.updateMany({
      where: { id, userId },
      data: definidos({ ...dto, titulo: dto.titulo?.trim() }),
    });
    if (r.count === 0) throw new NotFoundException("Conteúdo não encontrado.");
  }

  async definirStatus(userId: string, ids: string[], status: string) {
    this.limitar(ids);
    await this.prisma.conteudo.updateMany({ where: { id: { in: ids }, userId }, data: { status } });
  }

  /** Apaga o conteúdo e todos os subtópicos (cascata no banco). */
  async removerConteudo(userId: string, id: string) {
    const r = await this.prisma.conteudo.deleteMany({ where: { id, userId } });
    if (r.count === 0) throw new NotFoundException("Conteúdo não encontrado.");
  }

  /* ------------------------------- cronograma ------------------------------- */

  private async validarReferencias(
    userId: string,
    itens: Array<{ concursoId: string; disciplinaId?: string | null; conteudoId?: string | null; cronogramaItemId?: string | null }>,
  ) {
    const [concursos, disciplinas, conteudos, cronograma] = await Promise.all([
      this.concursosDoUsuario(userId, itens.map((i) => i.concursoId)),
      this.disciplinasDoUsuario(userId, itens.map((i) => i.disciplinaId)),
      this.conteudosDoUsuario(userId, itens.map((i) => i.conteudoId)),
      this.cronogramaDoUsuario(userId, itens.map((i) => i.cronogramaItemId)),
    ]);
    for (const i of itens) {
      if (!concursos.has(i.concursoId)) this.invalido("concurso");
      if (i.disciplinaId && disciplinas.get(i.disciplinaId) !== i.concursoId) this.invalido("disciplina");
      if (i.conteudoId && conteudos.get(i.conteudoId)?.concursoId !== i.concursoId) this.invalido("conteúdo");
      if (i.cronogramaItemId && cronograma.get(i.cronogramaItemId) !== i.concursoId) this.invalido("item do cronograma");
    }
  }

  async criarCronograma(userId: string, itens: CronogramaDto[]) {
    this.limitar(itens);
    await this.validarReferencias(userId, itens);
    await this.prisma.cronogramaItem.createMany({
      data: itens.map((i) => ({
        id: i.id ?? randomUUID(),
        userId,
        concursoId: i.concursoId,
        disciplinaId: i.disciplinaId ?? null,
        conteudoId: i.conteudoId ?? null,
        data: paraData(i.data)!,
        ...definidos({
          horario: i.horario,
          duracaoMinutos: i.duracaoMinutos,
          titulo: i.titulo?.trim() || undefined,
          descricao: i.descricao,
          tipo: i.tipo,
          concluido: i.concluido,
        }),
      })),
    });
  }

  async atualizarCronograma(userId: string, id: string, dto: AtualizarCronogramaDto) {
    const atual = await this.prisma.cronogramaItem.findFirst({ where: { id, userId }, select: { concursoId: true } });
    if (!atual) throw new NotFoundException("Item do cronograma não encontrado.");
    if (dto.disciplinaId || dto.conteudoId) {
      await this.validarReferencias(userId, [{ concursoId: atual.concursoId, disciplinaId: dto.disciplinaId, conteudoId: dto.conteudoId }]);
    }
    await this.prisma.cronogramaItem.updateMany({
      where: { id, userId },
      data: definidos({
        disciplinaId: dto.disciplinaId,
        conteudoId: dto.conteudoId,
        data: dto.data === undefined ? undefined : paraData(dto.data)!,
        horario: dto.horario,
        duracaoMinutos: dto.duracaoMinutos,
        titulo: dto.titulo?.trim() || undefined,
        descricao: dto.descricao,
        tipo: dto.tipo,
        concluido: dto.concluido,
      }),
    });
  }

  async removerCronograma(userId: string, id: string) {
    const r = await this.prisma.cronogramaItem.deleteMany({ where: { id, userId } });
    if (r.count === 0) throw new NotFoundException("Item do cronograma não encontrado.");
  }

  /* ------------------------------- registros ------------------------------- */

  private validarQuestoes(feitas?: number, acertos?: number) {
    if ((acertos ?? 0) > (feitas ?? 0)) throw new BadRequestException("Os acertos não podem passar do total de questões feitas.");
  }

  async criarRegistros(userId: string, itens: RegistroDto[]) {
    this.limitar(itens);
    itens.forEach((r) => this.validarQuestoes(r.questoesFeitas, r.questoesAcertos));
    await this.validarReferencias(userId, itens);
    await this.prisma.registroEstudo.createMany({
      data: itens.map((r) => ({
        id: r.id ?? randomUUID(),
        userId,
        concursoId: r.concursoId,
        disciplinaId: r.disciplinaId ?? null,
        conteudoId: r.conteudoId ?? null,
        cronogramaItemId: r.cronogramaItemId ?? null,
        data: paraData(r.data)!,
        minutos: r.minutos,
        foco: r.foco ?? null,
        iniciadoEm: r.iniciadoEm ? new Date(r.iniciadoEm) : null,
        ...definidos({
          atividades: r.atividades,
          questoesFeitas: r.questoesFeitas,
          questoesAcertos: r.questoesAcertos,
          anotacao: r.anotacao,
        }),
      })),
    });
  }

  async atualizarRegistro(userId: string, id: string, dto: AtualizarRegistroDto) {
    const atual = await this.prisma.registroEstudo.findFirst({ where: { id, userId } });
    if (!atual) throw new NotFoundException("Registro não encontrado.");
    this.validarQuestoes(dto.questoesFeitas ?? atual.questoesFeitas, dto.questoesAcertos ?? atual.questoesAcertos);
    if (dto.disciplinaId || dto.conteudoId) {
      await this.validarReferencias(userId, [{ concursoId: atual.concursoId, disciplinaId: dto.disciplinaId, conteudoId: dto.conteudoId }]);
    }
    await this.prisma.registroEstudo.updateMany({
      where: { id, userId },
      data: definidos({ ...dto, data: dto.data === undefined ? undefined : paraData(dto.data)! }),
    });
  }

  async removerRegistro(userId: string, id: string) {
    const r = await this.prisma.registroEstudo.deleteMany({ where: { id, userId } });
    if (r.count === 0) throw new NotFoundException("Registro não encontrado.");
  }

  /* ------------------------------- importação ------------------------------- */

  /**
   * Grava um pacote inteiro (backup ou dados da versão antiga) numa única
   * transação: ou entra tudo, ou nada. Todas as referências precisam apontar
   * para itens do próprio pacote.
   */
  async importar(userId: string, p: PacoteDto) {
    const semId = [...p.concursos, ...p.disciplinas, ...p.conteudos, ...p.cronograma, ...p.registros].some((x) => !x.id);
    if (semId) throw new BadRequestException("Todos os itens importados precisam ter id.");

    const unico = (lista: Array<{ id?: string }>, nome: string) => {
      const ids = new Set(lista.map((x) => x.id!));
      if (ids.size !== lista.length) throw new BadRequestException(`Há ${nome} com id repetido.`);
      return ids;
    };
    const concursos = unico(p.concursos, "concursos");
    const disciplinas = unico(p.disciplinas, "disciplinas");
    const conteudos = unico(p.conteudos, "conteúdos");
    const cronograma = unico(p.cronograma, "itens de cronograma");
    unico(p.registros, "registros");

    const ok = (cond: boolean, que: string) => {
      if (!cond) throw new BadRequestException(`Pacote inconsistente: ${que}.`);
    };
    const disciplinaPorId = new Map(p.disciplinas.map((d) => [d.id!, d]));
    p.disciplinas.forEach((d) => ok(concursos.has(d.concursoId), "disciplina sem concurso"));
    p.conteudos.forEach((c) => {
      ok(disciplinas.has(c.disciplinaId), "conteúdo sem disciplina");
      ok(!c.parentId || conteudos.has(c.parentId), "conteúdo com pai inexistente");
    });
    const conteudoPorId = new Map(p.conteudos.map((c) => [c.id!, c]));
    for (const i of [...p.cronograma, ...p.registros]) {
      ok(concursos.has(i.concursoId), "item sem concurso");
      ok(!i.disciplinaId || disciplinas.has(i.disciplinaId), "referência a disciplina inexistente");
      ok(!i.conteudoId || conteudos.has(i.conteudoId), "referência a conteúdo inexistente");
    }
    p.registros.forEach((r) => {
      ok(!r.cronogramaItemId || cronograma.has(r.cronogramaItemId), "referência a item de cronograma inexistente");
      this.validarQuestoes(r.questoesFeitas, r.questoesAcertos);
    });

    // pais antes dos filhos: cada chunk só referencia linhas gravadas antes (ou no mesmo comando)
    const profundidade = (c: ConteudoDto): number => {
      let n = 0;
      let atual: ConteudoDto | undefined = c;
      while (atual?.parentId && n < 200) {
        atual = conteudoPorId.get(atual.parentId);
        n++;
      }
      return n;
    };
    const conteudosOrdenados = [...p.conteudos].sort((a, b) => profundidade(a) - profundidade(b));

    const pedacos = <T>(lista: T[]) =>
      Array.from({ length: Math.ceil(lista.length / TAMANHO_CHUNK) }, (_, i) => lista.slice(i * TAMANHO_CHUNK, (i + 1) * TAMANHO_CHUNK));

    await this.prisma.$transaction(
      async (tx) => {
        for (const c of p.concursos) {
          await tx.concurso.create({ data: { ...(this.dadosConcurso(c) as { titulo: string }), id: c.id!, userId } });
        }
        for (const lote of pedacos(p.disciplinas)) {
          await tx.disciplina.createMany({
            data: lote.map((d) => ({
              id: d.id!,
              userId,
              concursoId: d.concursoId,
              nome: d.nome.trim(),
              ...definidos({ cor: d.cor, peso: d.peso, ordem: d.ordem }),
            })),
          });
        }
        for (const lote of pedacos(conteudosOrdenados)) {
          await tx.conteudo.createMany({
            data: lote.map((c) => ({
              id: c.id!,
              userId,
              concursoId: disciplinaPorId.get(c.disciplinaId)!.concursoId,
              disciplinaId: c.disciplinaId,
              parentId: c.parentId ?? null,
              titulo: c.titulo.trim(),
              ...definidos({ observacao: c.observacao, status: c.status, ordem: c.ordem }),
            })),
          });
        }
        for (const lote of pedacos(p.cronograma)) {
          await tx.cronogramaItem.createMany({
            data: lote.map((i) => ({
              id: i.id!,
              userId,
              concursoId: i.concursoId,
              disciplinaId: i.disciplinaId ?? null,
              conteudoId: i.conteudoId ?? null,
              data: paraData(i.data)!,
              ...definidos({
                horario: i.horario,
                duracaoMinutos: i.duracaoMinutos,
                titulo: i.titulo?.trim() || undefined,
                descricao: i.descricao,
                tipo: i.tipo,
                concluido: i.concluido,
              }),
            })),
          });
        }
        for (const lote of pedacos(p.registros)) {
          await tx.registroEstudo.createMany({
            data: lote.map((r) => ({
              id: r.id!,
              userId,
              concursoId: r.concursoId,
              disciplinaId: r.disciplinaId ?? null,
              conteudoId: r.conteudoId ?? null,
              cronogramaItemId: r.cronogramaItemId ?? null,
              data: paraData(r.data)!,
              minutos: r.minutos,
              foco: r.foco ?? null,
              iniciadoEm: r.iniciadoEm ? new Date(r.iniciadoEm) : null,
              ...definidos({
                atividades: r.atividades,
                questoesFeitas: r.questoesFeitas,
                questoesAcertos: r.questoesAcertos,
                anotacao: r.anotacao,
              }),
            })),
          });
        }
      },
      { timeout: 120_000, maxWait: 15_000 },
    );

    return {
      concursos: p.concursos.length,
      disciplinas: p.disciplinas.length,
      conteudos: p.conteudos.length,
      cronograma: p.cronograma.length,
      registros: p.registros.length,
    };
  }
}
