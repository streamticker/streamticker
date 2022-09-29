FROM node:alpine as builder
WORKDIR /app

COPY . .
RUN yarn
RUN yarn build

FROM node:alpine
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/.next .
COPY --from=builder /app/prisma .
RUN yarn install --production

CMD ["yarn", "start"]
