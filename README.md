# App

The Tauri Todo App is a full-stack application designed as a starting point for building feature-rich, containerized applications. 

### RestAPI Server
The API server is built using Fastify, a high-performance web framework for Node.js. The server is configured with HTTPS, logging, authentication via Supertokens, and Swagger documentation.

### Frontend App
A simple Todo application built with React, React Router, and Tauri APIs. The frontend integrates Supertokens for secure authentication.

![image](https://github.com/erikyo/tauri-app-starter/assets/8550908/cf8266e5-6b78-43a6-b468-e09bc3cdc86a)

### Features

**Dockerized Environment**: Utilizes Docker Compose to orchestrate services such as MySQL, Supertokens, and Fastify API for seamless development.

**Frontend (React) App**: A simple Todo application built with React, React Router, Tailwind, and Tauri APIs. The frontend integrates Supertokens for secure authentication.

**Fastify REST API**: Employs Fastify, a high-performance web framework, for the backend API. The API supports CRUD operations for managing tasks.

**Supertokens Authentication**: Enhances security with Supertokens, providing a robust authentication mechanism for user sessions.

**Tauri Integration**: Utilizes Tauri, a framework for building native-like applications, to package and distribute the app across different platforms.


### Docker-compose will bring up a full-stack application with the following services:

- db-supertokens: MySQL database for Supertokens. (port 3307)
- supertokens: Supertokens service. (port 3456)
- db-app: MySQL database for the application. (port 3306)
- adminer: Adminer for MySQL database management (port 3002)
- api: Dockerized Fastify API server (port 3001)
- app: Node.js image for building and running the frontend app (port 3000)

# Requirements

**Docker**

Download the latest version of Docker Desktop from [here](https://www.docker.com/products/docker-desktop)

**Node.js**

Download the latest version of Node.js from [here](https://nodejs.org/en/download/)

### How to use

## Run the app

```bash 
  docker-compose up
```

##### CORE
This app relies on the authentication method RBAC so you need first to start the  

- The above command will start the container with an in-memory database.

```bash
docker run -p 3567:3567 -d registry.supertokens.io/supertokens/supertokens-mysql:7.0
```
**NOTE**: refer to this documentation to start the server without Docker https://supertokens.com/docs/thirdpartypasswordless/custom-ui/init/core/without-docker

#### API Server 

- Start the Api server with the command

```bash
  npm run start:backend
```

#### UI 

- Start the UI server with the command

```bash
  npm run start:frontend
```

## Build the app

```bash
  npm run build-app
```
