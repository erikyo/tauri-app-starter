import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { todoSchema } from "../schema/todo.schema.js";
import { errorSchema } from "../schema/error.schema.js";

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
  fastify.addSchema(todoSchema);
  fastify.addSchema(errorSchema);
  return fastifySwagger(fastify, options, done);
}

export default fastifyPlugin(configPlugin);
