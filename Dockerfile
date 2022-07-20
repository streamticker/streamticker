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
ADD .env.prod .env
RUN yarn build

RUN yarn cache clean

CMD ["yarn", "start"]
