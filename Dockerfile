FROM node:16.13.2-buster

WORKDIR /web

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .
CMD ["yarn", "start"]
