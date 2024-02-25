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
   * Route for getting all todos
   */
  fastify.get(prefix, { preHandler: sessionHandler }, async (req, res) => {
    /**
     * The TodoModel instance
     */
    const result = await connection.query("SELECT * FROM todo");
    return result[0] as Todo[];
  });

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

  fastify.get(
    `${prefix}/:id`,
    { preHandler: sessionHandler },
    async (req, reply) => {
      const id = (req.params as { id: string }).id;
      const [rows] = await connection.query(
        "SELECT * FROM todo WHERE id = ? LIMIT 1",
        id,
      );
      return rows[0] as Todo;
    },
  );

  fastify.patch(
    `${prefix}/:id`,
    { ...TodoValidationSchema },
    async (req, reply) => {
      const id = (req.params as { id: string }).id;
      const todo = req.body as Todo;
      const result = await connection.query("UPDATE todo SET ? WHERE id = ?", [
        todo,
        id,
      ]);
      return (
        result[0] as {
          fieldCount: number;
          affectedRows: number;
          insertId: number;
        }
      ).insertId;
    },
  );

  fastify.delete(`${prefix}/:id`, async (req, reply) => {
    const id = (req.params as { id: string }).id;
    const result = await connection.query("DELETE FROM todo WHERE id = ?", id);
    return (
      (
        result[0] as {
          fieldCount: number;
          affectedRows: number;
          insertId: number;
        }
      ).affectedRows > 0
    );
  });

  connection.release();
}

export default fastifyPlugin(routes);
