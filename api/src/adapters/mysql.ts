import mysql from "@fastify/mysql";
import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";

const plugin = async (fastify: FastifyInstance) => {
  const { config } = fastify;

  fastify.register(mysql, {
    host: process.env.NODE_ENV === "docker" ? "mysql" : config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    namedPlaceholders: true,
    promise: true,
    connectionLimit: 100,
    waitForConnections: true,
  });
};

export default fastifyPlugin(plugin);
