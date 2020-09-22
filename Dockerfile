FROM node:12-alpine

USER node

ENV PORT=3000

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

COPY --chown=node . .
RUN npm run build 

EXPOSE ${PORT}

CMD [ "node", "dist/main" ]
