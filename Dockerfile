# Use an official Node.js runtime as a parent image
FROM node:lts-bullseye-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# copy the .env file
COPY .env ./

# copy the src folder
COPY ./api/src/ ./src/

# copy the src folder
COPY ./*.json ./

# Install app dependencies
RUN npm ci

# Set the default value for ACTION
ENV ACTION="start"

# Set the value of ACTION based on NODE_ENV
CMD if [ "$NODE_ENV" = "test" ]; \
    then export ACTION="test"; \
    fi && npm run $ACTION
