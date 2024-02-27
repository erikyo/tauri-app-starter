import appFramework from "./app.js";
import { FastifyInstance } from "fastify";
import { getEnv } from "./utils/index.js";

async function serve() {
  getEnv();

  // Trigger the application framework to load
  const app = (await appFramework()) as FastifyInstance;

  // Start the server
  return await app
    .listen({
      port: app.config.API_PORT,
      host: process.env.NODE_ENV !== "docker" ? app.config.API_HOST : "0.0.0.0",
    })
    .catch((error) => {
      app.log.error(error);
      process.exit(1);
    });
}

serve().catch((error) => console.error(error));

export default serve;
