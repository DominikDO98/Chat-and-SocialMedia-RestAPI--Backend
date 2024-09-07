FROM node:20

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm i

COPY . /usr/src/app/

ENV DOCKER_APP_PORT=4000  DOCKER_POSTGRES_PORT=5432 DOCKER_POSTGRES_HOST=postgres

EXPOSE 4000

CMD [ "npm", "start" ]