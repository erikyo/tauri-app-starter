# Use an official Node.js runtime as a parent image
FROM node:lts-bullseye-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY api/package*.json ./

# Install app dependencies
RUN npm install

# copy the .env file
COPY .env .

# Copy the rest of the application code
COPY api .
