# Use an official Node.js runtime as a parent image
FROM node:lts-slim

WORKDIR /usr/src/api/

# copy the package.json and package-lock.json files to the working folder
COPY ./api/*.json ./

# Install app dependencies
RUN npm ci

# Set the default value for ACTION
ENV ACTION="start"

# Set the value of ACTION based on NODE_ENV
CMD if [ "$NODE_ENV" = "test" ]; \
    then export ACTION="test"; \
    fi && npm run $ACTION
