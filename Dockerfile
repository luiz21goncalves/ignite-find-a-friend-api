FROM node:20.12.2-alpine3.19 AS base
RUN corepack enable pnpm && corepack use pnpm@9.0.2
WORKDIR /usr/src/app

FROM base as dev-dependencies
ENV NODE_ENV=development
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base as dependencies
ENV NODE_ENV=development
COPY package.json pnpm-lock.yaml prisma ./
RUN pnpm install --prod --frozen-lockfile

FROM base as builder
ENV NODE_ENV=production
COPY --from=dev-dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM base as runner
ENV NODE_ENV=production
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
CMD [ "node","./dist/server.js" ]
