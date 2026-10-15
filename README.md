# Bun + Elysia + Next.js starter

A small full-stack starter: an [Elysia](https://elysiajs.com) API on [Bun](https://bun.sh),
a [Next.js](https://nextjs.org) app in front of it, [Better Auth](https://better-auth.com)
sessions and [Drizzle](https://orm.drizzle.team) on PostgreSQL. MIT licensed.

It covers the parts that take a day to get right the first time and nothing
else:

- **Better Auth inside Elysia.** The handler is mounted on the API, and an
  `auth` macro gives any route a typed `user` with one option: `{ auth: true }`.
- **One session for both apps.** Next.js rewrites `/api/*` to the API, so the
  browser only ever talks to one origin. The auth cookie is first-party for
  both, and there is no CORS to configure.
- **End-to-end types.** The web app calls the API through
  [Eden](https://elysiajs.com/eden/overview), typed from the API's own route
  definitions. Rename a field in the API and the web app stops compiling.
- **A real example resource.** `notes` has validation, per-user scoping (one
  user cannot read or delete another user's rows) and tests that hit the
  database.

## Quick start

You need [Bun](https://bun.sh) 1.3+ and Docker.

```bash
git clone https://github.com/Dave93/bun-elysia-nextjs-starter
cd bun-elysia-nextjs-starter
bun install
cp .env.example .env    # then set BETTER_AUTH_SECRET: openssl rand -base64 32
bun run setup           # starts PostgreSQL on :5433 and creates the tables
bun run dev             # web on :3000, API on :3001
```

Open http://localhost:3000, create an account, add a note. API docs (OpenAPI)
are at http://localhost:3000/api/docs.

## Layout

```
apps/
  api/        Elysia on Bun
    src/auth.ts             Better Auth config
    src/auth-plugin.ts      mounts /api/auth/* and the `auth` macro
    src/modules/notes/      example resource
    test/                   bun test, against the database in .env
  web/        Next.js (App Router), Tailwind CSS v4
    next.config.ts          the /api/* rewrite
    lib/api.ts              typed Eden client
    lib/session.ts          server-side session check
packages/
  db/         Drizzle schema (Better Auth tables + notes) and client
```

## Scripts

| command | what it does |
|---|---|
| `bun run dev` | API and web with reload |
| `bun run test` | API tests (needs `bun run setup` first) |
| `bun run typecheck` | `tsc` in every package |
| `bun run build` | production build of the web app |
| `bun run db:push` | apply the Drizzle schema to the database |

## Adding a protected route

```ts
import { Elysia, t } from "elysia"
import { authPlugin } from "../../auth-plugin"

export const profile = new Elysia({ prefix: "/api/profile" })
  .use(authPlugin)
  .get("/", ({ user }) => ({ id: user.id, email: user.email }), { auth: true })
```

Register it in `apps/api/src/app.ts` with `.use(profile)`, and it shows up in
the Eden client as `api.api.profile.get()`.

## When you need more

This starter stops at auth and one resource on purpose. If the project you are
starting needs the rest of a SaaS, our team sells
[ShipKit](https://shipkit.davrapps.dev/en?utm_source=github&utm_medium=repo&utm_campaign=bun-elysia-nextjs-starter),
built on the same stack.

| | this starter | ShipKit |
|---|---|---|
| Elysia API on Bun, Next.js, Drizzle, PostgreSQL | ✓ | ✓ |
| Better Auth: email and password | ✓ | ✓ |
| Better Auth: email verification, OAuth, 2FA, passkeys, magic links | — | ✓ |
| Payments (Polar) and entitlements | — | ✓ |
| Admin panel, background worker, transactional email, file storage | — | ✓ |
| i18n, UI component library, docs app, AI and MCP | — | ✓ |
| Licence | MIT, free | one-time, paid |

The starter is not a cut-down copy of ShipKit. It is written for this
repository and kept small enough to read in one sitting.

## Licence

MIT. See [LICENSE](LICENSE).
