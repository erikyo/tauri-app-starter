# App

The backend Rest Api is powered by Fastify and the frontend is an app built with Tauri.

We are going to use:

- mysql database to store the data (docker).
- Supertokens as Auth provider
- Tauri and Vite to build the frontend app
- Fastify to build the rest api
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
  npm run start
```

#### UI 

- Start the UI server with the command

```bash
  npm run dev
```


## Notes:

- if you run the Api on Docker, you need to update the Api Host to "127.0.0.1" for localhost and "0.0.0.0" with docker

