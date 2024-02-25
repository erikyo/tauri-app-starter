# App

The backend Rest Api is powered by Fastify and the frontend is an app built with Tauri.

With the docker compose setup you can run the following:

- A mysql database to store the data (port 3306).
- Supertokens as Auth provider (port 3567)
- Tauri and Vite to build the frontend app (port 3000)
- Fastify to build the rest api (port 3001)

## Dependencies
- Typescript to build the codebase
- Docker to run the backend server and serve the api

# Requirements

**Docker**

Download the latest version of Docker Desktop from [here](https://www.docker.com/products/docker-desktop)

**Node.js**

Download the latest version of Node.js from [here](https://nodejs.org/en/download/)

### How to use

## Run the app

```bash 
  npm run start
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
