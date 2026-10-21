-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concursos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "orgao" TEXT NOT NULL DEFAULT '',
    "banca" TEXT NOT NULL DEFAULT '',
    "cargo" TEXT NOT NULL DEFAULT '',
    "nivel" TEXT NOT NULL DEFAULT 'superior',
    "vagas" INTEGER NOT NULL DEFAULT 0,
    "salario" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "data_prova" DATE,
    "data_inscricao_inicio" DATE,
    "data_inscricao_fim" DATE,
    "url_edital" TEXT NOT NULL DEFAULT '',
    "observacoes" TEXT NOT NULL DEFAULT '',
    "meta_horas_semana" DECIMAL(5,1) NOT NULL DEFAULT 20,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "concursos_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "concursos_titulo_check" CHECK (length(btrim("titulo")) > 0),
    CONSTRAINT "concursos_nivel_check" CHECK ("nivel" IN ('fundamental','medio','tecnico','superior','outro')),
    CONSTRAINT "concursos_vagas_check" CHECK ("vagas" >= 0),
    CONSTRAINT "concursos_salario_check" CHECK ("salario" >= 0),
    CONSTRAINT "concursos_meta_check" CHECK ("meta_horas_semana" >= 0 AND "meta_horas_semana" <= 168)
);

-- CreateTable
CREATE TABLE "disciplinas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "concurso_id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL DEFAULT '#2563eb',
    "peso" DECIMAL(6,1) NOT NULL DEFAULT 1,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "disciplinas_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "disciplinas_nome_check" CHECK (length(btrim("nome")) > 0),
    CONSTRAINT "disciplinas_peso_check" CHECK ("peso" >= 0 AND "peso" <= 1000)
);

-- CreateTable
CREATE TABLE "conteudos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "concurso_id" UUID NOT NULL,
    "disciplina_id" UUID NOT NULL,
    "parent_id" UUID,
    "titulo" TEXT NOT NULL,
    "observacao" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conteudos_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "conteudos_titulo_check" CHECK (length(btrim("titulo")) > 0),
    CONSTRAINT "conteudos_status_check" CHECK ("status" IN ('pendente','em_estudo','concluido'))
);

-- CreateTable
CREATE TABLE "cronograma_itens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "concurso_id" UUID NOT NULL,
    "disciplina_id" UUID,
    "conteudo_id" UUID,
    "data" DATE NOT NULL,
    "horario" TEXT NOT NULL DEFAULT '19:00',
    "duracao_minutos" INTEGER NOT NULL DEFAULT 60,
    "titulo" TEXT NOT NULL DEFAULT 'Estudo',
    "descricao" TEXT NOT NULL DEFAULT '',
    "tipo" TEXT NOT NULL DEFAULT 'teoria',
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cronograma_itens_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "cronograma_horario_check" CHECK ("horario" ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
    CONSTRAINT "cronograma_duracao_check" CHECK ("duracao_minutos" BETWEEN 5 AND 1440),
    CONSTRAINT "cronograma_tipo_check" CHECK ("tipo" IN ('teoria','questoes','revisao','resumo','simulado','leitura'))
);

-- CreateTable
CREATE TABLE "registros_estudo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "concurso_id" UUID NOT NULL,
    "disciplina_id" UUID,
    "conteudo_id" UUID,
    "cronograma_item_id" UUID,
    "data" DATE NOT NULL DEFAULT CURRENT_DATE,
    "minutos" INTEGER NOT NULL,
    "atividades" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "questoes_feitas" INTEGER NOT NULL DEFAULT 0,
    "questoes_acertos" INTEGER NOT NULL DEFAULT 0,
    "foco" SMALLINT,
    "anotacao" TEXT NOT NULL DEFAULT '',
    "iniciado_em" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registros_estudo_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "registros_minutos_check" CHECK ("minutos" BETWEEN 1 AND 1440),
    CONSTRAINT "registros_atividades_check" CHECK ("atividades" <@ ARRAY['aula','questoes','revisao','leitura','resumo','simulado']::TEXT[]),
    CONSTRAINT "registros_questoes_check" CHECK ("questoes_feitas" >= 0 AND "questoes_acertos" >= 0 AND "questoes_acertos" <= "questoes_feitas"),
    CONSTRAINT "registros_foco_check" CHECK ("foco" BETWEEN 1 AND 5)
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "concursos_user_id_idx" ON "concursos"("user_id");

-- CreateIndex
CREATE INDEX "disciplinas_concurso_id_ordem_idx" ON "disciplinas"("concurso_id", "ordem");

-- CreateIndex
CREATE INDEX "disciplinas_user_id_idx" ON "disciplinas"("user_id");

-- CreateIndex
CREATE INDEX "conteudos_concurso_id_idx" ON "conteudos"("concurso_id");

-- CreateIndex
CREATE INDEX "conteudos_disciplina_id_ordem_idx" ON "conteudos"("disciplina_id", "ordem");

-- CreateIndex
CREATE INDEX "conteudos_parent_id_idx" ON "conteudos"("parent_id");

-- CreateIndex
CREATE INDEX "conteudos_user_id_idx" ON "conteudos"("user_id");

-- CreateIndex
CREATE INDEX "cronograma_itens_concurso_id_data_idx" ON "cronograma_itens"("concurso_id", "data");

-- CreateIndex
CREATE INDEX "cronograma_itens_user_id_idx" ON "cronograma_itens"("user_id");

-- CreateIndex
CREATE INDEX "registros_estudo_concurso_id_data_idx" ON "registros_estudo"("concurso_id", "data" DESC);

-- CreateIndex
CREATE INDEX "registros_estudo_disciplina_id_idx" ON "registros_estudo"("disciplina_id");

-- CreateIndex
CREATE INDEX "registros_estudo_user_id_idx" ON "registros_estudo"("user_id");

-- AddForeignKey
ALTER TABLE "concursos" ADD CONSTRAINT "concursos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_concurso_id_fkey" FOREIGN KEY ("concurso_id") REFERENCES "concursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conteudos" ADD CONSTRAINT "conteudos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conteudos" ADD CONSTRAINT "conteudos_concurso_id_fkey" FOREIGN KEY ("concurso_id") REFERENCES "concursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conteudos" ADD CONSTRAINT "conteudos_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conteudos" ADD CONSTRAINT "conteudos_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "conteudos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cronograma_itens" ADD CONSTRAINT "cronograma_itens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cronograma_itens" ADD CONSTRAINT "cronograma_itens_concurso_id_fkey" FOREIGN KEY ("concurso_id") REFERENCES "concursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cronograma_itens" ADD CONSTRAINT "cronograma_itens_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cronograma_itens" ADD CONSTRAINT "cronograma_itens_conteudo_id_fkey" FOREIGN KEY ("conteudo_id") REFERENCES "conteudos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_estudo" ADD CONSTRAINT "registros_estudo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_estudo" ADD CONSTRAINT "registros_estudo_concurso_id_fkey" FOREIGN KEY ("concurso_id") REFERENCES "concursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_estudo" ADD CONSTRAINT "registros_estudo_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_estudo" ADD CONSTRAINT "registros_estudo_conteudo_id_fkey" FOREIGN KEY ("conteudo_id") REFERENCES "conteudos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_estudo" ADD CONSTRAINT "registros_estudo_cronograma_item_id_fkey" FOREIGN KEY ("cronograma_item_id") REFERENCES "cronograma_itens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Row Level Security: a API conecta como dono do banco e é quem controla o acesso.
-- Ligar a RLS (sem policies) impede que a chave pública do Supabase leia estas tabelas pela API REST automática.
ALTER TABLE "usuarios" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "concursos" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "disciplinas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "conteudos" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "cronograma_itens" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "registros_estudo" ENABLE ROW LEVEL SECURITY;
