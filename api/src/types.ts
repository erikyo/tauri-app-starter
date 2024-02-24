import {
  type MySQLConnection,
  type MySQLPool,
  type MySQLPromiseConnection,
  type MySQLPromisePool,
} from "@fastify/mysql";

/**
 * @see https://github.com/fastify/fastify-mysql
 */
declare module "fastify" {
  interface FastifyInstance {
    mysql:
      | MySQLPool // if you only pass connectionString
      | MySQLConnection // if you passed type = 'connection'
      | MySQLPromisePool // if you passed promise = true
      | MySQLPromiseConnection; // if you passed promise = true, type = 'connection'
  }
}

type ENV = {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SOCKET: string;
  HTTP_PORT: number;
  HTTP_HOST: string;
  CORS_ORIGIN_URL: string;
};

declare module "fastify" {
  interface FastifyInstance {
    config: ENV;
    confkey: "config";
    mysql:
      | MySQLPool
      | MySQLConnection
      | MySQLPromisePool
      | MySQLPromiseConnection;
  }
}
