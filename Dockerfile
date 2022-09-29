FROM node:16
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
WORKDIR /app
COPY .yarn .yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY package.json .
RUN yarn workspaces focus --production
RUN mv node_modules node_modules_production
RUN yarn
COPY . .
COPY .env.ci .env
RUN yarn build
RUN rm .env
RUN node-prune
RUN rm -rf node_modules
RUN mv node_modules_production node_modules
RUN yarn cache clean
RUN rm -rf .yarn
CMD ["yarn", "start"]
