import Fastify, { type FastifyInstance } from "fastify";

import config from "./plugins/config.js";
import auth from "./plugins/auth.js";
import swagger from "./plugins/swagger.js";
import swaggerUi from "./plugins/swagger-ui.js";
import db from "./adapters/mysql.js";

import routes from "./routes/index.js";
import todoRoutes from "./routes/todo.js";

export default async function appFramework(): Promise<FastifyInstance> {
  return (
    Fastify({
      logger: ["docker"].includes(process.env.NODE_ENV),
    })
      .register(config)
      .register(auth)
      .register(db)

      // Register Routes
      .register(routes)
      .register(todoRoutes)
      .register(swagger)
      .register(swaggerUi)

      .ready()
  );
}
