import fastifyEnv from '@fastify/env'
import fastifyPlugin from 'fastify-plugin'
import FastifyEnvOptions from '@fastify/env'

export const schema = {
    type: 'object',
    required: [
        'DB_HOST',
        'DB_SOCKET',
        'DB_PORT',
        'DB_USERNAME',
        'DB_PASSWORD',
        'DB_NAME',

        'HTTP_HOST',
        'HTTP_PORT',

        'CORS_ORIGIN_URL',

        'SUPERTOKENS_CONNECTION_URI',
        'SUPERTOKENS_API_KEY',
        'SUPERTOKENS_APPNAME',
        'SUPERTOKENS_API_DOMAIN',
        'SUPERTOKENS_API_BASE_PATH',
        'SUPERTOKENS_WEBSITE_DOMAIN',
        'SUPERTOKENS_WEBSITE_BASE_PATH',
        // 'SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_ID',
        // 'SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_SECRET',
        // 'SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_ID',
        // 'SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_SECRET',
        // 'SUPERTOKENS_3RD_PARTY_APPLE_CLIENT_ID',
        // 'SUPERTOKENS_3RD_PARTY_APPLE_KEY_ID',
        // 'SUPERTOKENS_3RD_PARTY_APPLE_PRIVATE_KEY',
        // 'SUPERTOKENS_3RD_PARTY_APPLE_TEAM_ID',
    ],
    properties: {
        DB_HOST: {
            type: 'string',
            default: 'localhost'
        },
        DB_PORT: {
            type: 'number',
            default: 3306
        },
        DB_USERNAME: {
            type: 'string'
        },
        DB_PASSWORD: {
            type: 'string'
        },
        DB_NAME: {
            type: 'string'
        },
        DB_SOCKET: {
            type: 'string',
            default: '/tmp/mysql.sock'
        },
        HTTP_PORT: {
            type: 'number',
            default: 3001
        },
        HTTP_HOST: {
            type: 'string',
            default: '0.0.0.0'
        },
        CORS_ORIGIN_URL: {
            type: 'string'
        },
        SUPERTOKENS_CONNECTION_URI: {
            type: 'string'
        },
        SUPERTOKENS_API_KEY: {
            type: 'string'
        },
        SUPERTOKENS_APPNAME: {
            type: 'string'
        },
        SUPERTOKENS_API_DOMAIN: {
            type: 'string'
        },
        SUPERTOKENS_API_BASE_PATH: {
            type: 'string'
        },
        SUPERTOKENS_WEBSITE_DOMAIN: {
            type: 'string'
        },
        SUPERTOKENS_WEBSITE_BASE_PATH: {
            type: 'string'
        },
        SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_ID: {
            type: 'string'
        },
        SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_SECRET: {
            type: 'string'
        },
        SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_ID: {
            type: 'string'
        },
        SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_SECRET: {
            type: 'string'
        },
        SUPERTOKENS_3RD_PARTY_APPLE_CLIENT_ID: {
            type: 'string'
        },
        SUPERTOKENS_3RD_PARTY_APPLE_KEY_ID: {
            type: 'string'
        },
        SUPERTOKENS_3RD_PARTY_APPLE_PRIVATE_KEY: {
            type: 'string'
        },
        SUPERTOKENS_3RD_PARTY_APPLE_TEAM_ID: {
            type: 'string'
        }
    }
}

/**
 * Configures the plugin with the provided server, options, and done callback.
 *
 * @param {Object} server - the server instance
 * @param {Object} options - the plugin options
 * @param {Function} done - the callback function
 */
function configPlugin(server, options, done) {

    const configOptions: FastifyEnvOptions.FastifyEnvOptions = {
        // decorate the Fastify server instance with `config` key
        // such as `fastify.config('PORT')
        confKey: 'config',
        // Schema to validate
        schema,
        // Source for the configuration data
        data: process.env,
        // will read .env in the root folder
        dotenv: true
    }

    fastifyEnv(server, configOptions, done)
}

export default fastifyPlugin(configPlugin)
