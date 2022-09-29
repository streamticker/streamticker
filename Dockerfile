FROM node:16
WORKDIR /app
COPY .yarn .yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY package.json .
RUN yarn
COPY . .
COPY .env.ci .env
RUN yarn build
RUN rm .env
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune
RUN rm -rf node_modules
RUN yarn workspaces focus --production
CMD ["yarn", "start"]
