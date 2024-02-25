export interface Todo {
  readonly id: number | undefined;
  task_name: string;
  task_content: string;
  completed: boolean | undefined;
}

export const todoSchema = {
  $id: "Task",
  description: "Object representing a Task",
  type: "object",
  properties: {
    id: {
      readOnly: true,
      example: 23,
      description: "id of the task",
      type: "number",
    },
    task_name: {
      description: "name of the task",
      type: "string",
      example: "My task",
    },
    task_content: {
      description: "content of the task description",
      type: "string",
      example: "My important task",
    },
    completed: {
      description: "indicates if a taks is completed or not",
      type: "boolean",
      default: false,
    },
    creation_date: {
      description: "creation date of the task",
      type: "string",
    },
    modification_date: {
      description: "modification date of the task",
      type: "string",
    },
  },
};
