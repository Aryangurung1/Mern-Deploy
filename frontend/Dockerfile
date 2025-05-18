# Dockerfile for Frontend
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Serve the build with a static server
RUN npm install -g serve
EXPOSE 5173

CMD ["serve", "-s", "dist"]
