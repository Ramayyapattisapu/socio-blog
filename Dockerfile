FROM node:20-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . ./
EXPOSE 8080
CMD ["node", "server.js"]
