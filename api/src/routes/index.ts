import fastifyPlugin from "fastify-plugin";
import Session from "supertokens-node/recipe/session/index.js";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { sessionHandler } from "../handler/handler.js";
import { verifySession } from "supertokens-node/lib/build/recipe/session/framework/fastify.js";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/", () => {
    return "hello";
  });

  fastify.get(
    "/authorized/",
    { preHandler: sessionHandler },
    async (request, reply) => {
      const session = await Session.getSession(request, reply);
      return session ? { message: "authorized" } : { message: "unauthorized" };
    },
  );

  fastify.get(
    "/getJWT",
    {
      preHandler: verifySession(),
    },
    (req, res) => {
      let session = (req as any).session;

      let jwt = session.getAccessToken();
      res.send({ token: jwt });
    },
  );
}

export default fastifyPlugin(routes);
