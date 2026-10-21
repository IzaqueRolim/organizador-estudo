import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { config } from "../config";
import { PrismaService } from "../prisma/prisma.service";

// hash de uma senha qualquer: gasta o mesmo tempo no login quando o e-mail não existe
const HASH_FALSO = bcrypt.hashSync("senha-descartavel", 12);

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private emitir(usuario: { id: string; email: string }) {
    return {
      token: this.jwt.sign({ sub: usuario.id, email: usuario.email }),
      usuario: { id: usuario.id, email: usuario.email },
    };
  }

  async registrar(email: string, senha: string) {
    if (!config.allowRegistration) throw new ForbiddenException("O cadastro de novos usuários está desativado.");
    const existente = await this.prisma.usuario.findUnique({ where: { email } });
    if (existente) throw new ConflictException("Este e-mail já tem conta. Entre com a senha.");

    const passwordHash = await bcrypt.hash(senha, 12);
    const usuario = await this.prisma.usuario.create({ data: { email, passwordHash } });
    return this.emitir(usuario);
  }

  async entrar(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
    const confere = await bcrypt.compare(senha, usuario?.passwordHash ?? HASH_FALSO);
    if (!usuario || !confere) throw new UnauthorizedException("E-mail ou senha incorretos.");
    return this.emitir(usuario);
  }

  async perfil(userId: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id: userId } });
    if (!usuario) throw new UnauthorizedException("Sessão inválida. Entre novamente.");
    return { id: usuario.id, email: usuario.email };
  }
}
