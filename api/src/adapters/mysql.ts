import mysql from "@fastify/mysql";
import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";

const plugin = async (fastify: FastifyInstance, options: any) => {
  const { config } = fastify as any;

  fastify.register(mysql, {
    host: process.env.NODE_ENV === "docker" ? "db-app" : config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    namedPlaceholders: true,
    promise: true,
    connectionLimit: 100,
    waitForConnections: true,
  });
};

export default fastifyPlugin(plugin);
