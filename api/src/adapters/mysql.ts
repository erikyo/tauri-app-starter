import mysql from '@fastify/mysql'
import fastifyPlugin from 'fastify-plugin'

const plugin = async (fastify, options) => {
  const { config } = fastify

  fastify.register(mysql, {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    namedPlaceholders: true,
    promise: true,
    connectionLimit: 100,
    waitForConnections: true
  })
}

export default fastifyPlugin(plugin)