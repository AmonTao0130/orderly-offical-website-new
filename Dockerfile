FROM node:lts-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

FROM base AS build-deps
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN pnpm run build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs

