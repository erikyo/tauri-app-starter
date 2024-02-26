import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { MySQLPromisePool } from "@fastify/mysql";
import { Todo } from "../schema/todo.schema.js";
import { TodoValidationSchema } from "../schema/todo.validation.js";
import { sessionHandler } from "../handler/handler.js";

const prefix = "/task";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const connection = await (fastify.mysql as MySQLPromisePool).getConnection();

  /**
   * Route for getting all tasks
   */
  fastify.get(prefix, { preHandler: sessionHandler }, async (req, res) => {
    const result = await connection.query("SELECT * FROM todo");
    return result[0] as Todo[];
  });

  /**
   * Route for creating a task
   */
  fastify.put(prefix, { preHandler: sessionHandler }, async (req, reply) => {
    const todo = req.body as Todo;
    const result = await connection.query("INSERT INTO todo SET ?", [todo]);
    return (
      result[0] as {
        fieldCount: number;
        affectedRows: number;
        insertId: number;
      }
    ).insertId;
  });

  /**
   * Route for getting a task by its id
   */
  fastify.get(
    `${prefix}/:id`,
    { preHandler: sessionHandler },
    async (req, reply) => {
      const id = Number((req.params as { id: any }).id);
      console.log(id);
      const [rows] = await connection.query("SELECT * FROM todo WHERE id = ?", [
        id,
      ]);
      console.log(rows);
      return rows[0] as Todo;
    },
  );

  /**
   * Route for updating a task
   */
  fastify.patch(
    `${prefix}/:id`,
    { preHandler: sessionHandler, ...TodoValidationSchema },
    async (req, reply) => {
      const id = Number((req.params as { id: any }).id);
      const todo = req.body as Todo;
      const result = await connection.query("UPDATE todo SET ? WHERE id = ?", [
        todo,
        id,
      ]);
      return (
        (
          result[0] as {
            fieldCount: number;
            affectedRows: number;
            insertId: number;
          }
        ).affectedRows > 1
      );
    },
  );

  /**
   * Route for deleting a task
   */
  fastify.delete(
    `${prefix}/:id`,
    { preHandler: sessionHandler },
    async (req, reply) => {
      const id = Number((req.params as { id: any }).id);
      const result = await connection.query("DELETE FROM todo WHERE id = ?", [
        id,
      ]);
      return (
        (
          result[0] as {
            fieldCount: number;
            affectedRows: number;
            insertId: number;
          }
        ).affectedRows > 0
      );
    },
  );

  connection.release();
}

export default fastifyPlugin(routes);
