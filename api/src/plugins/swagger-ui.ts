import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";
import SwaggerUiPlugin, {
  FastifySwaggerUiConfigOptions,
} from "@fastify/swagger-ui";

/**
 * Configures the plugin with the provided server, options, and done callback.
 *
 * @param {FastifyInstance} fastify - the server instance
 * @param {Object} options - the plugin options
 * @param {Function} done - the callback function
 */
function configPlugin(fastify: FastifyInstance, options, done: () => void) {
  options = {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  } as FastifySwaggerUiConfigOptions;
  return SwaggerUiPlugin(fastify, options, done);
}

export default fastifyPlugin(configPlugin);
