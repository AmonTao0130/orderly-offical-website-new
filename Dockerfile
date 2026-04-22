
FROM node:18-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

FROM base AS build-deps
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN pnpm run build

FROM base AS landing-page-build
RUN apk add --no-cache git
WORKDIR /app
RUN git clone --branch static https://github.com/AmonTao0130/orderly-website-update.git /app/orderly-website-landing
WORKDIR /app/orderly-website-landing
RUN npm i
RUN npm run build
RUN cp -r out /app/out

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY /server ./server
RUN rm -rf /app/dist/client/_next /app/dist/client/images /app/dist/client/campaigns /app/dist/client/.well-known
COPY --from=landing-page-build /app/out/_next /app/dist/client/_next
COPY --from=landing-page-build /app/out/images /app/dist/client/images
COPY --from=landing-page-build /app/out/campaigns /app/dist/client/campaigns
COPY --from=landing-page-build /app/out/.well-known /app/dist/client/.well-known
COPY --from=landing-page-build /app/out/index.html /app/dist/client/index.html
COPY --from=landing-page-build /app/out/faq.html /app/dist/client/faq/index.html
COPY --from=landing-page-build /app/out/partners.html /app/dist/client/partners/index.html
COPY --from=landing-page-build /app/out/skill.md /app/dist/client/skill.md

ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
CMD node ./server/index.mjs

