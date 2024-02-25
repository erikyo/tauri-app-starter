import fastifyPlugin from "fastify-plugin";
import Session from "supertokens-node/recipe/session/index.js";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/", () => {
    return "hello";
  });

  fastify.get("/authorized/", async (request, reply) => {
    const session = await Session.getSession(request, reply);
    return session ? { message: "authorized" } : { message: "unauthorized" };
  });
}

export default fastifyPlugin(routes);
