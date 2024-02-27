import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";

export const schema = {
  type: "object",
  required: [
    "MYSQL_HOST",
    "MYSQL_PORT",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
    "MYSQL_DATABASE",

    "API_DOMAIN",
    "API_HOST",
    "API_PORT",

    "APP_NAME",
    "SUPERTOKENS_CONNECTION_URI",
    "SUPERTOKENS_API_KEY",
    "SUPERTOKENS_API_BASE_PATH",

    "APP_DOMAIN",
  ],
  properties: {
    MYSQL_HOST: {
      type: "string",
    },
    MYSQL_PORT: {
      type: "number",
      default: 3306,
    },
    MYSQL_USER: {
      type: "string",
    },
    MYSQL_PASSWORD: {
      type: "string",
    },
    MYSQL_DATABASE: {
      type: "string",
    },

    API_DOMAIN: {
      type: "string",
    },
    API_HOST: {
      type: "string",
    },
    API_PORT: {
      type: "number",
      default: 3001,
    },

    APP_NAME: {
      type: "string",
    },
    SUPERTOKENS_API_KEY: {
      type: "string",
    },
    SUPERTOKENS_CONNECTION_URI: {
      type: "string",
    },
    SUPERTOKENS_API_BASE_PATH: {
      type: "string",
    },

    APP_DOMAIN: {
      type: "string",
    },

    SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_ID: {
      type: "string",
    },
    SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_SECRET: {
      type: "string",
    },

    SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_ID: {
      type: "string",
    },
    SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_SECRET: {
      type: "string",
    },

    SUPERTOKENS_3RD_PARTY_APPLE_CLIENT_ID: {
      type: "string",
    },
    SUPERTOKENS_3RD_PARTY_APPLE_KEY_ID: {
      type: "string",
    },
    SUPERTOKENS_3RD_PARTY_APPLE_PRIVATE_KEY: {
      type: "string",
    },
    SUPERTOKENS_3RD_PARTY_APPLE_TEAM_ID: {
      type: "string",
    },
  },
};

/**
 * Configures the plugin with the provided server, options, and done callback.
 *
 * @param {FastifyInstance} fastify - the server instance
 * @param {Object} options - the plugin options
 * @param {Function} done - the callback function
 */
function configPlugin(
  fastify: FastifyInstance,
  options: FastifyEnvOptions,
  done: () => void,
) {
  options = {
    // decorate the Fastify server instance with `config` key
    // such as `fastify.config('PORT')
    confKey: "config",
    // Schema to validate
    schema,
    // Source for the configuration data
    data: process.env,
    // will read .env in the root folder
    dotenv: true, // load .env if it is there, default: false
  } as FastifyEnvOptions;

  fastifyEnv(fastify, options, done);
}

export default fastifyPlugin(configPlugin);
