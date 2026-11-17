# Production image for the server.
# Build from the repository root, where the pnpm workspace files live:
#   docker build -f server/Dockerfile -t rooms-server .
# Run it. The database is not in this image: pass its URL.
#   docker run -p 3000:3000 -e DATABASE_URL=postgres://user:pass@host:5432/db rooms-server

# Stage 1: install the server's production dependencies only
FROM node:26-slim AS deps
RUN npm install -g pnpm@12.21.0
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json server/
RUN pnpm install --frozen-lockfile --prod --filter server

# Stage 2: the image that runs. No client, no TypeScript compiler, no linter:
# Node runs the .ts files directly by stripping the types.
FROM node:26-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/server/node_modules ./server/node_modules
COPY server/package.json server/*.ts ./server/
WORKDIR /app/server
USER node
EXPOSE 3000
CMD ["node", "index.ts"]
