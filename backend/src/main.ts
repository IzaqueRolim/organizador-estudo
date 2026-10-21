import "reflect-metadata";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { config } from "./config";
import { FiltroExcecoes } from "./filtro-excecoes";

async function iniciar() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: false });

  // atrás do proxy do Render: usa o IP real do cliente (limite de tentativas de login)
  app.set("trust proxy", 1);
  app.use(helmet());
  // a importação de um backup grande passa de 100 KB
  app.useBodyParser("json", { limit: "25mb" });

  app.enableCors({
    origin: (origem, retorno) => {
      const liberado = !origem || config.corsOrigins.includes("*") || config.corsOrigins.includes(origem.replace(/\/$/, ""));
      retorno(liberado ? null : new Error("Origem não permitida pelo CORS"), liberado);
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 600,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new FiltroExcecoes());
  app.enableShutdownHooks();

  await app.listen(config.port, "0.0.0.0");
  new Logger("Bootstrap").log(`API ouvindo na porta ${config.port}`);
}

void iniciar();
