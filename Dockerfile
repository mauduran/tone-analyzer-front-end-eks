FROM node:12-alpine

ARG PORT_NUM=3000
ENV PORT=3000

LABEL autor="Mauricio"

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT_NUM}

CMD [ "npm", "start" ]