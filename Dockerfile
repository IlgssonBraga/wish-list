FROM node:12

WORKDIR /home/node

ADD . /home/node

RUN npm i -g @nestjs/cli@7.4.1

RUN npm install

EXPOSE 3000

RUN npm run start:dev











