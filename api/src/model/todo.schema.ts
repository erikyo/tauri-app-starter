import Joi from "joi";

export interface TodoModel {
    readonly id: string
    readonly task_name: string
    readonly task_content: string
}

export const TodoValidationSchema = {
    schema: {
        body: Joi.object().keys({
            id: Joi.number(),
            task_name: Joi.string().required(),
            task_content: Joi.string().required()
        }).required()
    },
    validatorCompiler: ({ schema }) => {
        return data => schema.validate(data)
    }
}
