import {
  type MySQLConnection,
  type MySQLPool,
  type MySQLPromiseConnection,
  type MySQLPromisePool,
} from "@fastify/mysql";

type ENV = {
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DATABASE: string;
  DB_SOCKET: string;
  API_PORT: number;
  API_HOST: string;
  APP_DOMAIN: string;
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
