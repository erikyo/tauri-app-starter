export interface ErrorMsg {
  code: number;
  message: string;
}

export interface ApiError extends Error {
  code: number; // Error code
}

export const errorSchema = {
  $id: "Error",

  description: "Object representing an error",
  type: "object",
  properties: {
    code: {
      format: "int32",
      description: "Error code that identify of the error",
      type: "integer",
      example: "1000",
    },
    message: {
      description: "Short description of the error",
      type: "string",
      example: "Could not perform the task",
    },
  },
};
