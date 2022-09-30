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
RUN yarn build
RUN rm -rf node_modules
RUN mv .modules_production node_modules
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

RUN apk add curl
RUN yarn prisma generate
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune
RUN rm $(which node-prune)

CMD ["yarn", "start"]
