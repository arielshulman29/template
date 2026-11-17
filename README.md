# Study rooms: a full-stack JavaScript template

A small full-stack app in one repository: a **React client**, a **Fastify server** and a **Postgres** database.
The page lists study rooms; the server reads them from the database and answers with JSON.

## What's inside

```
client/              React app (Vite + TypeScript), runs in the browser
  src/App.tsx        the page: fetches /api/rooms and lists the rooms
  index.html         the entry point Vite builds from
  vite.config.ts     bundler config; in dev, forwards /api to the server
server/              API server (Fastify + TypeScript), run by Node
  index.ts           routes: GET /api/health, GET /api/rooms
  db.ts              Postgres connection pool (reads DATABASE_URL)
  .env.example       copy to .env: local settings and secrets (never committed)
  Dockerfile         production image for the server
compose.dev.yaml     development only: Postgres 17 in Docker on your laptop
db/init.sql          development only: creates the rooms table and sample rows
package.json         workspace root: scripts that run both parts
pnpm-workspace.yaml  the two packages: client and server
.oxlintrc.json       linter config (Oxlint)
```

## Requirements

- **Node.js 26** (the current LTS). `nvm use` picks it up from `.nvmrc`. Node 22.18+ also works: the server's `.ts` files run directly, Node strips the types.
- **pnpm**: `npm install -g pnpm`
- **Docker** (Docker Desktop, or Docker Engine with Compose)

## Getting started

```sh
pnpm install
cp server/.env.example server/.env
pnpm db:up     # start the development database (Postgres in Docker)
pnpm dev       # client: http://localhost:5173  server: http://localhost:3000
```

Open http://localhost:5173. You should see three study rooms, loaded from the database.

## Scripts (run from the root)

| Command | What it does |
| --- | --- |
| `pnpm dev` | client and server together, both restarting on save |
| `pnpm build` | builds the client into `client/dist` |
| `pnpm typecheck` | TypeScript checks for both parts |
| `pnpm lint` | Oxlint over the whole repo |
| `pnpm db:up` / `pnpm db:down` | start / stop the development database |
| `pnpm db:reset` | wipe the development database and re-run `db/init.sql` |

To run a script in one part only: `pnpm --filter server dev`. To add a package to one part: `pnpm --filter client add zod`.

## How a request flows

```
browser → Vite dev server (:5173) → /api/* forwarded → Fastify (:3000) → Postgres (:5432)
                                                          ↓
browser ← JSON  ←──────────────────────────────────────────┘
```

## Development vs production

**Development** (your laptop): `compose.dev.yaml` runs a throwaway Postgres with a plain-text password, and `db/init.sql` fills it with sample rows the first time it starts. `pnpm db:reset` wipes it and starts over. None of this is used in production.

**Production**: only the server is shipped, as a Docker image. The client is built (`pnpm build`) into static files for a CDN, and the database is a managed Postgres whose URL the hosting platform passes in as `DATABASE_URL`. Schema changes there go through migrations, not `init.sql`.

Build and run the server image (from the repository root):

```sh
docker build -f server/Dockerfile -t rooms-server .
docker run -p 3000:3000 -e DATABASE_URL=postgres://user:pass@host:5432/db rooms-server
```

The image installs only the server's production dependencies (Fastify, pg) and runs `node index.ts`: no build step, Node strips the types.

## Things to try

- Break a type in `server/index.ts`, then run `pnpm typecheck`.
- Add a route: `GET /api/rooms/:id` that returns one room.
- Add a column to `rooms` (reset the database to re-run `db/init.sql`) and show it on the page.
