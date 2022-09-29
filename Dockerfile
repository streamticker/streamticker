FROM node:alpine
RUN apk add openssl
WORKDIR /app
# ADD .env.ci .env hehe
ADD .yarnrc.yml .
ADD .yarn .yarn
ADD package.json .
ADD yarn.lock .
RUN yarn
ADD . .
RUN yarn build
RUN rm .env
RUN yarn cache clean
RUN rm -rf node_modules
RUN yarn install --production
CMD ["yarn", "start"]