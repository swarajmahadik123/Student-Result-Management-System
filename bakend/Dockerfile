# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port your app runs on
EXPOSE 3000

# Start your server
CMD ["npm", "start"]
CMD ["node", "server.js"]
CMD ["nodemon", "server.js"]