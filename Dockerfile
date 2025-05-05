# Dockerfile
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build client
RUN cd client && npm install && npm run build

# Start server
CMD ["npm", "run", "start"]