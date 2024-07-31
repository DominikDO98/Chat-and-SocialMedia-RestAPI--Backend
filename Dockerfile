FROM node:20

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm i

COPY . /usr/src/app/

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]