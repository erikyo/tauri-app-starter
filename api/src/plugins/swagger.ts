import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";

import fastifySwagger, { SwaggerOptions } from "@fastify/swagger";
import { schema } from "../schema.js";

/**
 * Configures the plugin with the provided server, options, and done callback.
 *
 * @param {FastifyInstance} fastify - the server instance
 * @param {Object} options - the plugin options
 * @param {Function} done - the callback function
 */
function configPlugin(
  fastify: FastifyInstance,
  options: SwaggerOptions,
  done: () => void,
) {
  options = schema;
  return fastifySwagger(fastify, options, done);
}

export default fastifyPlugin(configPlugin);
