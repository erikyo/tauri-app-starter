import { FastifyInstance, FastifyPluginOptions } from "fastify";
import responseHandler from "../handler/handler.js";
import fastifyPlugin from "fastify-plugin";
import TodoModel from "../model/todo.model.js";
import { MySQLPromisePool } from "@fastify/mysql";
import { Todo } from "../schema/todo.schema.js";
import { TodoValidationSchema } from "../schema/todo.validation.js";

const prefix = "/task";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const connection = await (fastify.mysql as MySQLPromisePool).getConnection();
  /**
   * Route for getting all todos
   */
  fastify.get(prefix, async (req, reply) => {
    /**
     * The TodoModel instance
     */
    const [rows] = await connection.query("SELECT * FROM todo");
    return rows;
  });

  fastify.post(prefix, TodoValidationSchema, async (req, reply) => {
    const todo = req.body as Todo;
    const [rows] = await connection.query("INSERT INTO todo SET ?", todo);
    return rows;
  });

  fastify.get(`${prefix}/:id`, async (req, reply) => {
    const id = Number((req.params as Todo).id);
    const [rows] = await connection.query(
      "SELECT * FROM todo WHERE id = ?",
      id,
    );
    return rows;
  });

  fastify.put(`${prefix}/:id`, TodoValidationSchema, async (req, reply) => {
    const id = Number((req.params as Todo).id);
    const todo = req.body as Todo;
    const [rows] = await connection.query("UPDATE todo SET ? WHERE id = ?", [
      todo,
      id,
    ]);
    return rows;
  });

  fastify.delete(`${prefix}/:id`, async (req, reply) => {
    const id = Number((req.params as Todo).id);
    const [rows] = await connection.query("DELETE FROM todo WHERE id = ?", id);
    return rows;
  });

  connection.release();
}

export default fastifyPlugin(routes);
