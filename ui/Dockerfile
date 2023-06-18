FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 5173

CMD ["npm", "run", "server"]