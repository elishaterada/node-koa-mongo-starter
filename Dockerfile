FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache bash
RUN npm install

ADD . /usr/src/app

EXPOSE 3001
