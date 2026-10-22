import { Body, Controller, Delete, Get, HttpCode, Param, ParseArrayPipe, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { UsuarioAtual, UsuarioToken } from "../auth/usuario-atual.decorator";
import { DadosService } from "./dados.service";
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
  StatusEmLoteDto,
} from "./dto";

const lista = <T>(items: new () => T) => new ParseArrayPipe({ items, whitelist: true });
const uuid = new ParseUUIDPipe({ version: undefined });

/** Todas as rotas daqui exigem login e só enxergam/alteram dados do próprio usuário. */
@Controller()
export class DadosController {
  constructor(private readonly dados: DadosService) {}

  @Get("dados")
  carregar(@UsuarioAtual() u: UsuarioToken) {
    return this.dados.carregar(u.sub);
  }

  @Post("importar")
  importar(@UsuarioAtual() u: UsuarioToken, @Body() pacote: PacoteDto) {
    return this.dados.importar(u.sub, pacote);
  }

  /* concursos */
  @Post("concursos")
  async criarConcursos(@UsuarioAtual() u: UsuarioToken, @Body(lista(ConcursoDto)) itens: ConcursoDto[]) {
    await this.dados.criarConcursos(u.sub, itens);
    return { ok: true };
  }
  @Patch("concursos/:id")
  async atualizarConcurso(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string, @Body() dto: AtualizarConcursoDto) {
    await this.dados.atualizarConcurso(u.sub, id, dto);
    return { ok: true };
  }
  @Delete("concursos/:id")
  @HttpCode(200)
  async removerConcurso(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string) {
    await this.dados.removerConcurso(u.sub, id);
    return { ok: true };
  }

  /* disciplinas */
  @Post("disciplinas")
  async criarDisciplinas(@UsuarioAtual() u: UsuarioToken, @Body(lista(DisciplinaDto)) itens: DisciplinaDto[]) {
    await this.dados.criarDisciplinas(u.sub, itens);
    return { ok: true };
  }
  @Patch("disciplinas/:id")
  async atualizarDisciplina(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string, @Body() dto: AtualizarDisciplinaDto) {
    await this.dados.atualizarDisciplina(u.sub, id, dto);
    return { ok: true };
  }
  @Delete("disciplinas/:id")
  @HttpCode(200)
  async removerDisciplina(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string) {
    await this.dados.removerDisciplina(u.sub, id);
    return { ok: true };
  }

  /* conteúdos */
  @Post("conteudos")
  async criarConteudos(@UsuarioAtual() u: UsuarioToken, @Body(lista(ConteudoDto)) itens: ConteudoDto[]) {
    await this.dados.criarConteudos(u.sub, itens);
    return { ok: true };
  }
  @Post("conteudos/status")
  @HttpCode(200)
  async definirStatus(@UsuarioAtual() u: UsuarioToken, @Body() dto: StatusEmLoteDto) {
    await this.dados.definirStatus(u.sub, dto.ids, dto.status);
    return { ok: true };
  }
  @Patch("conteudos/:id")
  async atualizarConteudo(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string, @Body() dto: AtualizarConteudoDto) {
    await this.dados.atualizarConteudo(u.sub, id, dto);
    return { ok: true };
  }
  @Delete("conteudos/:id")
  @HttpCode(200)
  async removerConteudo(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string) {
    await this.dados.removerConteudo(u.sub, id);
    return { ok: true };
  }

  /* cronograma */
  @Post("cronograma")
  async criarCronograma(@UsuarioAtual() u: UsuarioToken, @Body(lista(CronogramaDto)) itens: CronogramaDto[]) {
    await this.dados.criarCronograma(u.sub, itens);
    return { ok: true };
  }
  @Patch("cronograma/:id")
  async atualizarCronograma(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string, @Body() dto: AtualizarCronogramaDto) {
    await this.dados.atualizarCronograma(u.sub, id, dto);
    return { ok: true };
  }
  @Delete("cronograma/:id")
  @HttpCode(200)
  async removerCronograma(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string) {
    await this.dados.removerCronograma(u.sub, id);
    return { ok: true };
  }

  /* registros de estudo */
  @Post("registros")
  async criarRegistros(@UsuarioAtual() u: UsuarioToken, @Body(lista(RegistroDto)) itens: RegistroDto[]) {
    await this.dados.criarRegistros(u.sub, itens);
    return { ok: true };
  }
  @Patch("registros/:id")
  async atualizarRegistro(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string, @Body() dto: AtualizarRegistroDto) {
    await this.dados.atualizarRegistro(u.sub, id, dto);
    return { ok: true };
  }
  @Delete("registros/:id")
  @HttpCode(200)
  async removerRegistro(@UsuarioAtual() u: UsuarioToken, @Param("id", uuid) id: string) {
    await this.dados.removerRegistro(u.sub, id);
    return { ok: true };
  }
}
