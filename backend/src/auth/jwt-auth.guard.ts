import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC } from "./public.decorator";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const aberta = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()]);
    if (aberta) return true;

    const req = context.switchToHttp().getRequest();
    const [tipo, token] = (req.headers.authorization ?? "").split(" ");
    if (tipo !== "Bearer" || !token) throw new UnauthorizedException("Faça login para continuar.");

    try {
      req.user = await this.jwt.verifyAsync(token, { algorithms: ["HS256"] });
      return true;
    } catch {
      throw new UnauthorizedException("Sessão expirada. Entre novamente.");
    }
  }
}
