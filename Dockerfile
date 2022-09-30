FROM node:16-alpine as builder
RUN apk add --update libc6-compat openssl openssl-dev
WORKDIR /app
COPY .yarn .yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY package.json .
RUN yarn workspaces focus --production
RUN mv node_modules .modules_production
RUN yarn
COPY . .
COPY .env.ci .env
RUN yarn build
RUN rm .env
RUN rm -rf node_modules
RUN mv .modules_production node_modules
RUN yarn cache clean

FROM node:16-alpine
WORKDIR /app

ARG ADMIN_AUTH
ARG DATABASE_URL
ARG DISCORD_APP_ID
ARG DISCORD_BOT_TOKEN
ARG DISCORD_INTERACTION_PUBLIC_KEY
ARG HOP_API_KEY
ARG HOP_PROJECT_ID
ARG LINEAR_API_KEY
ARG LOWCAKE_API_KEY
ARG OPENSEA_API_KEY
ARG TOPGG_AUTH
ARG TOPGG_WEBHOOK_AUTH
ARG TWITCH_CLIENT_ID
ARG TWITCH_CLIENT_SECRET
ARG TWITTER_SECRET
ARG UPSTASH_REDIS_REST_TOKEN
ARG UPSTASH_REDIS_REST_URL
ARG WADOKEI_KEY
ARG YOUTUBE_SECRET

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN apk add curl
RUN yarn prisma generate
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune
RUN rm $(which node-prune)

CMD ["yarn", "start"]
