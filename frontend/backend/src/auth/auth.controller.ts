import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { AuthService } from "./auth.service";
import { CredenciaisDto } from "./auth.dto";
import { Public } from "./public.decorator";
import { UsuarioAtual, UsuarioToken } from "./usuario-atual.decorator";

// contra tentativa de adivinhar senha: poucas tentativas por minuto e por IP
const LIMITE_LOGIN = { default: { limit: 10, ttl: 60_000 } };

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Throttle(LIMITE_LOGIN)
  @Post("register")
  registrar(@Body() dto: CredenciaisDto) {
    return this.auth.registrar(dto.email, dto.senha);
  }

  @Public()
  @Throttle(LIMITE_LOGIN)
  @HttpCode(200)
  @Post("login")
  entrar(@Body() dto: CredenciaisDto) {
    return this.auth.entrar(dto.email, dto.senha);
  }

  @Get("me")
  perfil(@UsuarioAtual() usuario: UsuarioToken) {
    return this.auth.perfil(usuario.sub);
  }
}
