# specify the node base image with your desired version node:<version>
FROM node:8

WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

CMD [ "npm", "start" ]