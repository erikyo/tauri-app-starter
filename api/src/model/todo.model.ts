import { Todo } from "../schema/todo.schema.js";
import { ErrorMsg } from "../schema/error.schema.js";
import { MySqlConnection } from "../adapters/connection.js";

export function throwError(code: number, message: string): ErrorMsg {
  return { code, message };
}

export default class TodoModel {
  private static instance: TodoModel | null = null;

  public static getInstance() {
    if (!TodoModel.instance) {
      TodoModel.instance = new TodoModel();
    }
    return TodoModel.instance;
  }

  public async findAllTodo(): Promise<Todo[] | ErrorMsg> {
    await MySqlConnection.connect();
    const res = await MySqlConnection.query("SELECT * FROM todo");
    console.log(res);
    MySqlConnection.release();
    return res.rows as Todo[];
  }
}
