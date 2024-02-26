import appFramework from "./app.js";
import { FastifyInstance } from "fastify";

import { config } from "dotenv";
import path from "node:path";

async function serve() {
  console.log("Running NODE_ENV: " + process.env.NODE_ENV);

  if (process.env.NODE_ENV === "production") {
    config({ path: path.resolve(".env.production") });
  } else if (process.env.NODE_ENV === "docker") {
    config({ path: path.resolve(".env") });
  } else {
    config({ path: path.resolve("../.env") });
  }

  // Trigger the application framework to load
  const app = (await appFramework()) as FastifyInstance;

  // Start the server
  return await app
    .listen({
      port: app.config.HTTP_PORT,
      host:
        process.env.NODE_ENV === "docker" ? "0.0.0.0" : app.config.HTTP_HOST,
    })
    .catch((error) => {
      app.log.error(error);
      process.exit(1);
    });
}

serve().catch((error) => console.error(error));
