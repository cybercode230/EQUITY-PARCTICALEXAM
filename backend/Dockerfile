# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY ./src ./src

# Expose port from .env or default 5000
ARG PORT=5000
EXPOSE $PORT

# Start the server
CMD ["node", "src/server.js"]
