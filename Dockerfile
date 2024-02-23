# Use an official Node.js runtime as a parent image
FROM node:lts-bullseye-slim

# Set the working directory in the container
WORKDIR /usr/src/app/api

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Command to run the application
CMD ["npm", "run", "start"]
