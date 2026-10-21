import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import type { Response } from "express";

/** Traduz erros do banco em respostas HTTP claras e nunca vaza detalhes internos. */
@Catch()
export class FiltroExcecoes implements ExceptionFilter {
  private readonly logger = new Logger("Erro");

  catch(erro: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    if (erro instanceof HttpException) {
      return res.status(erro.getStatus()).json(erro.getResponse());
    }

    const e = erro as { code?: string; message?: string; meta?: unknown; cause?: { originalCode?: string; kind?: string } };
    const codigo = e?.code ?? e?.cause?.originalCode ?? "";
    // 23505 = unique, 23503 = FK, 23514 = CHECK (códigos do Postgres); P20xx = Prisma
    if (codigo === "P2002" || codigo === "23505") {
      return res.status(HttpStatus.CONFLICT).json({ statusCode: 409, message: "Registro duplicado: este id já existe." });
    }
    if (codigo === "P2003" || codigo === "23503") {
      return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 400, message: "Referência inválida: o item relacionado não existe." });
    }
    if (codigo === "P2025") {
      return res.status(HttpStatus.NOT_FOUND).json({ statusCode: 404, message: "Registro não encontrado." });
    }
    if (codigo === "23514" || codigo === "P2004") {
      return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 400, message: "Algum valor enviado não é permitido." });
    }

    this.logger.error(e?.message ?? String(erro), (erro as Error)?.stack);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ statusCode: 500, message: "Erro interno. Tente novamente." });
  }
}
