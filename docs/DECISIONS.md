# Decisions

## Why this repository exists

A free, MIT-licensed full-stack starter on Bun: Elysia for the API, Next.js for
the web app, Better Auth for sessions, Drizzle on PostgreSQL. It is small on
purpose. It shows the parts that take a day to get right the first time —
Better Auth mounted inside Elysia, one session shared by Next.js and the API
through a same-origin rewrite, end-to-end types over Eden — and nothing else.

It comes from the team behind [ShipKit](https://shipkit.davrapps.dev/en?utm_source=github&utm_medium=repo&utm_campaign=bun-elysia-nextjs-starter),
the paid kit built on the same stack. The starter is not a trimmed copy of it:
it is written for this repository and stays deliberately minimal.

## What is in

- `apps/api` — Elysia on Bun: Better Auth handler at `/api/auth/*`, a `session`
  macro for protected routes, one example resource (`notes`) with validation,
  OpenAPI at `/api/docs`, tests with `bun test`.
- `apps/web` — Next.js (App Router), Tailwind CSS v4: sign-up, sign-in, sign-out,
  a protected dashboard that reads and writes notes through the typed Eden client.
- `packages/db` — Drizzle schema (Better Auth tables + `notes`) and the client.
- `docker-compose.yml` — PostgreSQL for local development.

## What is out, and stays out

Payments and entitlements, an admin panel, background jobs, transactional
email, file storage, OAuth and 2FA, i18n, a component library, AI/RAG, an MCP
server, docs site, deployment guides, code generators. Each of these is a
project of its own; the starter would stop being readable if it grew them.
Where the README points to ShipKit for them, it says so once, in one table.

## Conventions

- Same origin in development: Next.js rewrites `/api/*` to the API, so the
  Better Auth cookie is first-party for both apps and CORS never comes up.
- One environment file at the repository root (`.env`), read by both apps.
- No code lands without a test or a check that runs in CI.
