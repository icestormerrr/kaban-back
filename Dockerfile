FROM node:19-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN npm build
EXPOSE 4000
CMD ["npm", "start"]