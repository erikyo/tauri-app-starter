import Fastify, { type FastifyInstance } from 'fastify'

import config from './plugins/config.js'
import auth from './plugins/auth.js'
import indexRoutes from './routes/index.js'
import db from './adapters/mysql.js'

export default async function appFramework (): Promise<FastifyInstance> {
  const fastify = await Fastify({ logger: true })
  fastify.register(config)
  fastify.register(auth)
  fastify.register(db)

  fastify.register(indexRoutes)

  fastify.ready()

  return fastify
}
