import Joi from "joi";
import { Todo } from "./todo.schema.js";

export const TodoValidationSchema = {
  schema: {
    body: Joi.object()
      .keys({
        id: Joi.number(),
        task_name: Joi.string().required(),
        task_content: Joi.string().required(),
        completed: Joi.boolean(),
      })
      .required(),
  },
  validatorCompiler: ({ schema }) => {
    return (data: Todo) => schema.validate(data);
  },
};
