FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8005

CMD [ "npm", "run", "start"]
