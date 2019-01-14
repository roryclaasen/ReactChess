FROM node:10
ENV NODE_ENV production

COPY ["package*.json", "./"]
RUN npm install --production --silent
COPY . .

EXPOSE 3000
CMD npm run start:server
