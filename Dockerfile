FROM node:16-alpine as builder
RUN apk add --update libc6-compat openssl openssl-dev curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
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
RUN node-prune
RUN yarn cache clean

FROM node:16-alpine
WORKDIR /app

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/yarn.lock ./yarn.lock

CMD ["yarn", "start"]
