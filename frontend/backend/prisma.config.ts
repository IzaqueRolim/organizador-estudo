import "dotenv/config";
import { defineConfig } from "prisma/config";

// Migrations usam DIRECT_URL (conexão em modo sessão); sem ela, cai para DATABASE_URL.
// Veja o README: no Render use o "Session pooler" do Supabase (IPv4).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});
