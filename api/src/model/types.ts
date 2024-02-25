import { Todo } from "./todoSchema.js";

interface dataInterface {
  code: number;
  message: string;
}

export interface SuccessInterface extends dataInterface {
  success: dataInterface;
}

export interface ErrorInterface extends dataInterface {
  error: dataInterface;
}

export type ResponseInterface =
  | String
  | Error
  | SuccessInterface
  | ErrorInterface
  | Todo
  | Todo[];
