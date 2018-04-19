FROM node:9-alpine

WORKDIR /src

ADD ./ /src

COPY .env.example /src/.env

ENV NODE_ENV dev

RUN npm install

EXPOSE 3000

CMD /src/node_modules/.bin/babel-node index.js
