FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#port 3000 for prod
EXPOSE 3000 
CMD ["node", "server.js"]
