import {
  type MySQLConnection,
  type MySQLPool,
  type MySQLPromiseConnection,
  type MySQLPromisePool
} from '@fastify/mysql'
import {FastifyInstance} from "fastify";

// if you only pass connectionString
// if you passed type = 'connection'
// if you passed promise = true
// if you passed promise = true, type = 'connection'
declare module 'fastify' {
    interface FastifyInstance {
        mysql: MySQLPool | MySQLConnection | MySQLPromisePool | MySQLPromiseConnection
    }
}

export interface SERVER extends FastifyInstance{
    mysql: MySQLPool | MySQLConnection | MySQLPromisePool | MySQLPromiseConnection
    config: {
        DB_HOST: string
        DB_PORT: number
        DB_USERNAME: string
        DB_PASSWORD: string
        DB_NAME: string
        DB_SOCKET: string
        HTTP_PORT: number
        HTTP_HOST: string
        CORS_ORIGIN_URL: string
    }
}
