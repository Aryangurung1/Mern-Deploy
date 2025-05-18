# Dockerfile for Backend
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Make sure port matches your .env PORT
EXPOSE 3000

CMD ["sh", "-c", "node userSeed.js && node index.js"]

