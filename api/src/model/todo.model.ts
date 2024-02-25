import { FastifyInstance } from "fastify";
import { MySQLPromisePool } from "@fastify/mysql";
import { Todo } from "../schema/todo.schema.js";
import { ErrorMsg } from "../schema/error.schema.js";

export function throwError(code: number, message: string): ErrorMsg {
  return { code, message };
}

export default class TodoModel {
  private static instance: TodoModel;
  private mysql: MySQLPromisePool;

  constructor(fastify: FastifyInstance) {
    this.mysql = fastify.mysql as MySQLPromisePool;
  }

  public static async getInstance(fastify: FastifyInstance) {
    if (!TodoModel.instance) {
      TodoModel.instance = new TodoModel(fastify);
    }
    return TodoModel.instance;
  }

  private async getConnection() {
    return await (this.mysql as MySQLPromisePool).getConnection();
  }

  public async findAllTodo(): Promise<Todo[] | ErrorMsg> {
    const connection = await this.getConnection();
    const [rows] = await connection.query("SELECT * FROM todo");
    connection.release();
    const todoList = rows as Todo[];
    return todoList.length ? todoList : throwError(400, "No todo found");
  }
}
