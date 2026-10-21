import "dotenv/config";

const obrigatoria = (nome: string): string => {
  const valor = process.env[nome];
  if (!valor) throw new Error(`Variável de ambiente ${nome} não definida (veja .env.example).`);
  return valor;
};

const jwtSecret = obrigatoria("JWT_SECRET");
if (jwtSecret.length < 32) {
  throw new Error("JWT_SECRET precisa ter pelo menos 32 caracteres.");
}

export const config = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: obrigatoria("DATABASE_URL"),
  databaseSsl: (process.env.DATABASE_SSL ?? "true").toLowerCase() !== "false",
  databasePoolMax: Number(process.env.DATABASE_POOL_MAX ?? 5),
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "30d",
  allowRegistration: (process.env.ALLOW_REGISTRATION ?? "true").toLowerCase() !== "false",
  corsOrigins: (process.env.CORS_ORIGIN ?? "http://localhost:5173")
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean),
};
