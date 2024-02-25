import { FastifyInstance, FastifyPluginOptions } from "fastify";
import responseHandler from "../handler/handler.js";
import fastifyPlugin from "fastify-plugin";
import TodoModel from "../model/todo.model.js";
import { MySQLPromisePool } from "@fastify/mysql";
import { TodoValidationSchema } from "../model/todo.validation.js";

import { todoSchema } from "../model/todoSchema.js";
import { errorSchema } from "../model/error.schema.js";
const prefix = "/task";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addSchema(todoSchema);
  fastify.addSchema(errorSchema);
  /**
   * Route for getting all todos
   */
  fastify.get(prefix, async (req, reply) => {
    const connection = await (
      fastify.mysql as MySQLPromisePool
    ).getConnection();
    const [rows] = await connection.query("SELECT * FROM todo");
    connection.release();
    return rows;
  });

  fastify.post(prefix, TodoValidationSchema, async (req, reply) => {
    /**
     * The TodoModel instance
     */
    const todoModel = await TodoModel.getInstance(fastify);
    await responseHandler(todoModel.findAllTodo, reply);
  });
}

export default fastifyPlugin(routes);
