import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";

export const schema = {
  type: "object",
  required: [
    "DB_HOST",
    "DB_PORT",
    "DB_USERNAME",
    "DB_PASSWORD",
    "DB_NAME",

    "HTTP_HOST",
    "HTTP_PORT",

    "SUPERTOKENS_CONNECTION_URI",
    "SUPERTOKENS_API_KEY",
    "SUPERTOKENS_APPNAME",
    "SUPERTOKENS_API_DOMAIN",
    "SUPERTOKENS_API_BASE_PATH",
    "SUPERTOKENS_WEBSITE_DOMAIN",
    "SUPERTOKENS_WEBSITE_BASE_PATH",
  ],
  properties: {
    DB_HOST: {
      type: "string",
      default: "0.0.0.0",
    },
    DB_PORT: {
      type: "number",
      default: 3306,
    },
    DB_USERNAME: {
      type: "string",
    },
    DB_PASSWORD: {
      type: "string",
    },
    DB_NAME: {
      type: "string",
    },

    HTTP_PORT: {
      type: "number",
      default: 3001,
    },
    HTTP_HOST: {
      type: "string",
      default: "0.0.0.0",
    },

    SUPERTOKENS_CONNECTION_URI: {
      type: "string",
    },
    SUPERTOKENS_API_KEY: {
      type: "string",
    },
    SUPERTOKENS_APPNAME: {
      type: "string",
    },
    SUPERTOKENS_API_DOMAIN: {
      type: "string",
    },
    SUPERTOKENS_API_BASE_PATH: {
      type: "string",
    },
    SUPERTOKENS_WEBSITE_DOMAIN: {
      type: "string",
    },
    SUPERTOKENS_WEBSITE_BASE_PATH: {
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
