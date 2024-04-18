FROM node:20.12.2-alpine3.19 AS base
WORKDIR /usr/src/app

FROM base as dependencies
RUN corepack enable pnpm
RUN corepack use pnpm@9.0.2
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM base as runner
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
CMD [ "npm","run", "start" ]
