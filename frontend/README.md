# Caderno de Concursos

Organizador de estudos para concursos: edital com disciplinas e conteúdos, pesos e horas por disciplina,
planejamento semanal/mensal, cronômetro de estudo e histórico.

```
frontend/   React + Vite + TypeScript (site estático)
backend/    NestJS + Prisma + PostgreSQL (API, roda em Docker)
render.yaml Blueprint do Render (API + site)
```

O banco é **apenas o Postgres do Supabase**, acessado direto pela API (connection string). Não usamos o
supabase-js, o Auth nem a API REST do Supabase: o login é da própria API (e-mail + senha, JWT).

## 1. Banco (Supabase)

1. Crie um projeto no Supabase e guarde a senha do banco.
2. Clique em **Connect** → aba **Session pooler** e copie a string (porta **5432**). Use essa no Render:
   a conexão direta (`db.xxx.supabase.co`) é só IPv6 e o Render não alcança.
   ```
   postgresql://postgres.SEUPROJETO:SENHA@aws-0-REGIAO.pooler.supabase.com:5432/postgres
   ```
3. Se a senha tiver caracteres especiais (`@ : / # ?`), troque-os pelo código de URL (`@` → `%40`).
4. Não precisa rodar SQL à mão: a API aplica as migrations (`prisma migrate deploy`) sempre que sobe.
   As tabelas ficam com RLS ligado e sem políticas, então a chave anon do Supabase não enxerga nada;
   só a API (que conecta como dono) lê e grava.

## 2. Rodar localmente

```bash
cd backend
cp .env.example .env        # preencha DATABASE_URL, DIRECT_URL e JWT_SECRET (>= 32 caracteres)
npm install
npm run prisma:generate
npm run prisma:deploy       # cria as tabelas
npm run start:dev           # http://localhost:3000  (teste: /health)

cd ../frontend
cp .env.example .env        # VITE_API_URL=http://localhost:3000
npm install
npm run dev                 # http://localhost:5173
```

Com Docker: `cd backend && docker compose up --build` (usa o `.env`).
Para testar sem o Supabase, `docker compose --profile local-db up --build` sobe também um Postgres local
(no `.env`: `DATABASE_URL=postgresql://postgres:postgres@db:5432/concursos` e `DATABASE_SSL=false`).

## 3. Subir para o Git

```bash
git init && git add . && git commit -m "Caderno de Concursos"
git branch -M main
git remote add origin git@github.com:SEU-USUARIO/caderno-concursos.git
git push -u origin main
```

O `.gitignore` já deixa de fora `.env`, `node_modules` e `dist`.

## 4. Deploy no Render

1. **New → Blueprint** e escolha o repositório. O `render.yaml` cria dois serviços:
   - `caderno-concursos-api` (Docker, `backend/`) — com health check em `/health`;
   - `caderno-concursos` (site estático, `frontend/`).
2. Preencha as variáveis que o Render pedir:

   | Serviço | Variável | Valor |
   |---|---|---|
   | API | `DATABASE_URL` | string do **Session pooler** (porta 5432) |
   | API | `DIRECT_URL` | a mesma string (usada nas migrations) |
   | API | `CORS_ORIGIN` | URL do site, sem barra final |
   | API | `JWT_SECRET` | gerado automaticamente |
   | Site | `VITE_API_URL` | URL pública da API |

   Como cada URL só existe depois do primeiro deploy, faça assim: crie o Blueprint, deixe `CORS_ORIGIN` e
   `VITE_API_URL` em branco, copie as duas URLs geradas, preencha e use **Manual Deploy** nos dois serviços.
3. Abra o site, **crie sua conta** e, em *Configurações*, importe seus dados antigos se tiver.
4. Depois de criar a sua conta, mude `ALLOW_REGISTRATION` para `false` na API: ninguém mais consegue se
   cadastrar (o login continua funcionando).

> No plano gratuito do Render a API "dorme" após alguns minutos sem uso; o primeiro acesso depois disso
> leva ~50 s. O site mostra o carregamento enquanto ela acorda.

## API (resumo)

Todas as rotas, menos `/health`, `/auth/register` e `/auth/login`, exigem `Authorization: Bearer <token>`
e só enxergam os dados do próprio usuário.

| Rota | O que faz |
|---|---|
| `POST /auth/register`, `POST /auth/login`, `GET /auth/me` | conta e sessão (senha com bcrypt, JWT) |
| `GET /dados` | tudo do usuário de uma vez |
| `POST/PATCH/DELETE /concursos`, `/disciplinas`, `/conteudos`, `/cronograma`, `/registros` | CRUD |
| `POST /conteudos/status` | marca vários conteúdos de uma vez |
| `POST /importar` | importa um backup inteiro numa transação |
