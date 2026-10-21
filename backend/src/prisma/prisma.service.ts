import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { config } from "../config";

/** Monta as opções do pool a partir da DATABASE_URL (Supabase exige SSL). */
function opcoesDoPool() {
  const url = new URL(config.databaseUrl);
  // parâmetros que só fazem sentido para outras ferramentas; o driver pg não os conhece
  url.searchParams.delete("sslmode");
  url.searchParams.delete("pgbouncer");
  url.searchParams.delete("connection_limit");

  return {
    connectionString: url.toString(),
    max: config.databasePoolMax,
    // o certificado do pooler do Supabase não está na cadeia padrão do Node
    ssl: config.databaseSsl ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 15_000,
    idleTimeoutMillis: 30_000,
  };
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({ adapter: new PrismaPg(opcoesDoPool()) });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Conectado ao PostgreSQL");
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
