FROM node:20.12.2-alpine3.19 AS base
WORKDIR /usr/src/app

FROM base as dev-dependencies
RUN corepack enable pnpm
RUN corepack use pnpm@9.0.2
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base as dependencies
RUN corepack enable pnpm
RUN corepack use pnpm@9.0.2
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM base as builder
RUN corepack enable pnpm
RUN corepack use pnpm@9.0.2
COPY --from=dev-dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM base as runner
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
CMD [ "node","./dist/server.js" ]
