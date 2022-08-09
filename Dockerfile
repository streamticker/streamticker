FROM node:alpine
RUN apk add openssl
WORKDIR /app
ADD .env.ci .env
ADD .yarnrc.yml .
ADD .yarn .yarn
ADD package.json .
ADD yarn.lock .
RUN yarn
ADD . .
RUN yarn build
RUN rm .env
RUN yarn cache clean
CMD ["yarn", "start"]
