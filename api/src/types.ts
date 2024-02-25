import {
  type MySQLConnection,
  type MySQLPool,
  type MySQLPromiseConnection,
  type MySQLPromisePool,
} from "@fastify/mysql";

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

/**
 * @see https://github.com/fastify/fastify-mysql
 */
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
