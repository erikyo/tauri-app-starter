import Fastify, { type FastifyInstance } from "fastify";

import config from "./plugins/config.js";
import auth from "./plugins/auth.js";
import db from "./adapters/mysql.js";
import routes from "./routes/index.js";
import todoRoutes from "./routes/todo.js";

export default async function appFramework(): Promise<FastifyInstance> {
  const fastify = await Fastify({ logger: true });
  fastify.register(config);
  fastify.register(auth);
  fastify.register(db);

  fastify.register(routes);
  fastify.register(todoRoutes);

  fastify.ready();

  return fastify;
}
