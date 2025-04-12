# Use official Node.js image
FROM node:18-slim

# Install Chromium and dependencies
RUN apt-get update && \
    apt-get install -y \
    chromium \
    fonts-indic \
    fonts-noto-cjk \
    fonts-freefont-ttf \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Set environment variables for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "server.js"]