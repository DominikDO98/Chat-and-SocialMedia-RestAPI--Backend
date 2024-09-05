FROM node:20

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm i

COPY . /usr/src/app/

ENV APP_PORT=4000 DOCKER_APP_HOST='app' DOCKER_POSTGRES_HOST='postgres' DOCKER_POSTGRES_PORT=5432

EXPOSE 4000

CMD [ "npm", "start" ]