FROM node:12

WORKDIR /usr/app

RUN npm i -g @nestjs/cli@7.4.1

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run" ,"start:dev"]










