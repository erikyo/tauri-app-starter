# Use an official Node.js runtime as a parent image
FROM node:lts-bullseye-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# copy the .env file
COPY .env ./

# Copy the rest of the application code
COPY api/ ./

# Install app dependencies
RUN npm install

# Set the default value for ACTION
ENV ACTION="start"

# Set the value of ACTION based on NODE_ENV
CMD if [ "$NODE_ENV" = "test" ]; \
    then export ACTION="test"; \
    fi && npm run $ACTION
