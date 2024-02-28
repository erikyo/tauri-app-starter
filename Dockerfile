# Use an official Node.js runtime as a parent image
FROM node:lts-bullseye-slim

WORKDIR /usr/src/api/

# copy the package.json and package-lock.json files to the working folder
COPY ./api/*.json ./

# Install OpenSSL
RUN apt update
RUN apt install -y openssl

# Install app dependencies
RUN npm ci

# Set the default value for ACTION
ENV ACTION="start"

# Set the value of ACTION based on NODE_ENV
CMD if [ "$NODE_ENV" = "test" ]; \
    then export ACTION="test"; \
    fi && rm -rf ssl \
    && mkdir -p ssl \
    && openssl req -new -x509 -nodes -out ssl/fastify.crt -keyout ssl/fastify.key -days 30 -extensions v3_req -subj "/keyUsage=critical,digitalSignature/extendedKeyUsage=serverAuth/C=CA/ST=QC/O=App/CN=localhost/subjectAltName=DNS:*.localhost,IP:127.0.0.1" \
    && npm run $ACTION
