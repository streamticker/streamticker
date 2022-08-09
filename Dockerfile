FROM node:alpine

# RUN apt-get update
RUN apk add openssl
WORKDIR /app
ADD .yarnrc.yml .
ADD .yarn .yarn
ADD package.json .
ADD yarn.lock .
RUN yarn
ADD . .
ADD .env.ci .env
RUN yarn build
RUN rm .env
RUN yarn cache clean
CMD ["yarn", "start"]
