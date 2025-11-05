import appFramework from "./app.js";
import type { FastifyInstance } from "fastify";
import { getEnv } from "./utils/index.js";
import { DOCKER_HOST } from "./constants.js";

async function serve() {
  getEnv();

  // Trigger the application framework to load
  const app = (await appFramework()) as FastifyInstance;

  // Start the server
  return await app
    .listen({
      port: app.config.API_PORT,
      host: ["docker", "test"].includes(process.env.NODE_ENV)
        ? DOCKER_HOST
        : app.config.API_HOST,
    })
    .catch((error) => {
      app.log.error(error);
      process.exit(1);
    });
}

serve().catch((error) => console.error(error));

export default serve;
