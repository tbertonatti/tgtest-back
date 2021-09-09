FROM node
ADD . /rest-api
WORKDIR /rest-api
RUN npm ci
ENTRYPOINT npm start
