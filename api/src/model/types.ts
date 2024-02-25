import { Todo } from "../schema/todo.schema.js";

interface dataInterface {
  code: number;
  message: string;
}

export interface SuccessInterface {
  success: dataInterface;
}

export interface ErrorInterface {
  error: dataInterface;
}

export type ResponseInterface =
  | String
  | Error
  | SuccessInterface
  | ErrorInterface
  | Todo
  | Todo[];
