import Fastify, { type FastifyInstance } from "fastify";

import config from "./plugins/config.js";
import auth from "./plugins/auth.js";
import swagger from "./plugins/swagger.js";
import swaggerUi from "./plugins/swagger-ui.js";
import db from "./adapters/mysql.js";

import routes from "./routes/index.js";
import todoRoutes from "./routes/todo.js";
import fs from "fs";
import path from "node:path";

export default async function appFramework(): Promise<FastifyInstance> {
  return (
    Fastify({
      https: {
        key: fs.readFileSync(path.resolve("ssl/fastify.key")),
        cert: fs.readFileSync(path.resolve("ssl/fastify.crt")),
      },
      logger: true,
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
