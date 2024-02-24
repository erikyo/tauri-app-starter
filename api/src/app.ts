import Fastify, { type FastifyInstance } from "fastify";

import config from "./plugins/config.js";
import auth from "./plugins/auth.js";
import db from "./adapters/mysql.js";
import routes from "./routes/index.js";

export default async function appFramework(): Promise<FastifyInstance> {
  return (
    Fastify({ logger: true })
      .register(config)
      .register(auth)
      .register(db)

      // Register Routes
      .register(routes)
      //.register(todoRoutes)

      .ready()
  );
}
