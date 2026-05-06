# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install            # Install dependencies
pnpm run start:dev      # Start with watch mode (development)
pnpm run build          # Compile TypeScript to dist/
pnpm run start:prod     # Run production build
pnpm run lint           # ESLint with auto-fix
pnpm run format         # Prettier format
pnpm run test           # Unit tests
pnpm run test:watch     # Unit tests in watch mode
pnpm run test:cov       # Coverage report
pnpm run test:e2e       # End-to-end tests
```

Prisma commands:
```bash
npx prisma migrate dev          # Run migrations (development)
npx prisma migrate deploy       # Run migrations (production)
npx prisma generate             # Regenerate Prisma client after schema changes
npx prisma studio               # Open Prisma Studio GUI
```

Run a single test file:
```bash
pnpm run test -- --testPathPattern=app.controller
```

## Architecture

Single-module monolithic NestJS app. All providers live in `AppModule` — no feature-based sub-modules yet.

**Request flow:** `AppController` → service (UsersService / PostsService / AppService) → `PrismaService` → PostgreSQL

### Key files

| File | Purpose |
|---|---|
| `src/app.module.ts` | Root module; imports `ConfigModule` globally |
| `src/app.controller.ts` | All HTTP endpoints |
| `src/services/prisma.service.ts` | Extends `PrismaClient`; singleton DB connection |
| `src/services/users.service.ts` | User CRUD via Prisma |
| `src/services/posts.service.ts` | Post CRUD via Prisma |
| `src/config/env.schema.ts` | Zod schema for env validation |
| `src/utils/logger.ts` | Console logger silenced in production |
| `prisma/schema.prisma` | DB schema (User ↔ Post one-to-many) |
| `generated/prisma/` | Auto-generated Prisma client (gitignored) |

### Database models

- **User**: `id`, `email` (unique), `name?`, `posts[]`
- **Post**: `id`, `title`, `content?`, `published` (default false), `authorId?` (nullable FK to User)

### Environment & configuration

`ConfigModule` loads `.env` and validates it with Zod (`src/config/env.schema.ts`).

Required env vars:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — minimum 10 characters
- `PORT` — defaults to 4000
- `NODE_ENV` — `development` | `production` | `test`

Use `.env.example` as the template.

### Prisma client path

The generated client outputs to `../generated/prisma` (not the default location). Import from `generated/prisma`, not `@prisma/client`.

### Docker

Multi-stage Dockerfile (Node 22 Alpine). Exposes port 4000. Build and run:
```bash
docker build -t nestjs-app .
docker run -p 4000:4000 --env-file .env nestjs-app
```
