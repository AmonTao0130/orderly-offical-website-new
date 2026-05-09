FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
ARG PARTNERSHIPS_TELEGRAM_BOT_TOKEN
ARG PARTNERSHIPS_TELEGRAM_CHAT_ID
ARG BEEHIIV_API_KEY
ENV PARTNERSHIPS_TELEGRAM_BOT_TOKEN=$PARTNERSHIPS_TELEGRAM_BOT_TOKEN
ENV PARTNERSHIPS_TELEGRAM_CHAT_ID=$PARTNERSHIPS_TELEGRAM_CHAT_ID
ENV BEEHIIV_API_KEY=$BEEHIIV_API_KEY

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 80

ENV PORT=80
# set hostname to localhost
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
