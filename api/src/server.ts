import appFramework from "./app.js";
import { FastifyInstance } from "fastify";

import { config } from "dotenv";
import path from "node:path";

async function serve() {
  // Trigger the application framework to load
  const app = (await appFramework()) as FastifyInstance;

  // Start the server
  return await app
    .listen({
      port: app.config.HTTP_PORT,
      host: app.config.HTTP_HOST,
    })
    .then(() => {
      app.log.info(
        `Server listening on ${app.config.HTTP_HOST}:${app.config.HTTP_PORT}`,
      );
    })
    .catch((error) => {
      app.log.error(error);
      process.exit(1);
    });
}

if (process.env.NODE_ENV !== "production") {
  config({ path: path.resolve("../.env") });
} else {
  config({ path: path.resolve("./.env.production") });
}

serve().catch((error) => console.error(error));
