import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";
import { Public } from "../auth/public.decorator";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
@SkipThrottle()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /** Usado pelo Render para saber se o serviço está de pé (inclui um ping no banco). */
  @Public()
  @Get()
  async verificar() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: "ok" };
    } catch {
      throw new ServiceUnavailableException({ status: "erro", detalhe: "banco indisponível" });
    }
  }
}
