import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface UsuarioToken {
  sub: string;
  email: string;
}

/** Entrega o usuário autenticado (vindo do token) ao método do controller. */
export const UsuarioAtual = createParamDecorator((_: unknown, ctx: ExecutionContext): UsuarioToken => {
  return ctx.switchToHttp().getRequest().user;
});
