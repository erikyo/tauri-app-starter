# Use an official Node.js runtime as a parent image
FROM node:lts-bullseye-slim

WORKDIR /usr/src/api

# copy the .env file
COPY .env .

# copy the src folder
COPY ./api/src/ ./src/

# copy the src folder
COPY ./api/*.json ./

# SSL
RUN mkdir ssl

# Install OpenSSL
RUN apt update
RUN apt install -y openssl

# Generate SSL
RUN openssl req -x509 -sha256 -nodes -keyout ssl/fastify.key -out ssl/fastify.crt -sha256 -days 3650 -newkey rsa:2048 -subj "/C=XX/ST=StateName/L=CityName/O=CompanyName/OU=CompanySectionName/CN=127.0.0.1"

# Install app dependencies
RUN npm ci

# Set the default value for ACTION
ENV ACTION="start"

# Set the value of ACTION based on NODE_ENV
CMD if [ "$NODE_ENV" = "test" ]; \
    then export ACTION="test"; \
    fi && npm run $ACTION
