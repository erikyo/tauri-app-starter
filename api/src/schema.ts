import { SwaggerOptions } from "@fastify/swagger";

const apiServerUrl = process.env.API_DOMAIN;

export const schema = {
  swagger: {
    openapi: "3.0.1",
    api_path: "/",
    api_version: "0.1",
    is_authenticated: false,
    is_superuser: false,
    info: {
      title: "A TODO-Task list application",
      description: "A simple application to handle tasks.",
      version: "1.0.0",
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: apiServerUrl,
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "task",
        description: "Task management",
      },
    ],
    paths: {
      routePrefix: "/api/v1",
      "/": {
        get: {
          tags: ["system"],
          summary: "Check the server status",
          operationId: "serverStatus",
          responses: {
            "200": {
              description: "Server status response",
            },
            default: {
              description: "Generic error response",
            },
          },
        },
      },
      "/auth": {
        get: {
          tags: ["system"],
          summary: "test auth endpoint",
          operationId: "authStatus",
          responses: {
            "200": {
              description: "Server status response",
            },
            default: {
              description: "Generic error response",
            },
          },
        },
      },
      "/getJWT": {
        get: {
          tags: ["system"],
          summary: "test jwt token",
          operationId: "authStatus",
          responses: {
            "200": {
              description: "Server status response",
            },
            default: {
              description: "Generic error response",
            },
          },
        },
      },
      "/task": {
        get: {
          tags: ["task"],
          summary: "Get the list of all tasks",
          operationId: "tasksGetAll",
          responses: {
            "200": {
              description: "List of all tasks",
            },
            default: {
              description: "Generic error response",
            },
          },
        },
        put: {
          parameters: [
            {
              name: "task",
              in: "body",
              description: "The new task",
              required: true,
              schema: {
                type: "object",
                required: ["task_name", "task_content"],
                properties: {
                  task_name: {
                    type: "string",
                    description: "The name of the task",
                    example: "Task Name",
                  },
                  task_content: {
                    type: "string",
                    description: "The content of the task",
                    example: "Task Content",
                  },
                },
              },
            },
          ],
          tags: ["task"],
          summary: "Create a new task",
          operationId: "tasksCreate",
          responses: {
            "200": {
              description: "The created task",
            },
            default: {
              description: "Generic error response",
            },
          },
        },
      },
      "/task/{taskId}": {
        parameters: [
          {
            name: "taskId",
            in: "path",
            type: "number",
            description: "The id of the task",
            required: true,
            example: 15,
          },
        ],
        get: {
          tags: ["task"],
          summary: "Get a single task based on its id",
          operationId: "tasksRead",
          responses: {
            "200": {
              description: "The requested task",
              examples: {
                description: "Task with id 15",
                value: 15,
              },
              schema: {
                type: "object",
                properties: {
                  task_id: {
                    type: "number",
                    description: "The id of the task",
                    example: 15,
                  },
                  task_name: {
                    type: "string",
                    description: "The name of the task",
                    example: "Task Name",
                  },
                  task_content: {
                    type: "string",
                    description: "The content of the task",
                    example: "Task Content",
                  },
                },
              },
            },
            default: {
              description: "Generic error response",
            },
          },
        },
        patch: {
          tags: ["task"],
          summary: "Update an existing task",
          operationId: "tasksUpdate",
          parameters: [
            {
              name: "task",
              in: "body",
              description: "The updated task",
              required: true,
              schema: {
                type: "object",
                required: ["task_name", "task_content"],
                properties: {
                  task_name: {
                    type: "string",
                    description: "The name of the task",
                    example: "Task Name",
                  },
                  task_content: {
                    type: "string",
                    description: "The content of the task",
                    example: "Task Content",
                  },
                },
              },
            },
          ],
          responses: {
            "200": {
              description: "The updated task",
              schema: {
                type: "number",
                example: 15,
                description: "The id of the task updated",
              },
            },
            default: {
              description: "Generic error response",
            },
            "400": {
              description: "Bad Request",
            },
          },
        },
        delete: {
          tags: ["task"],
          summary: "Delete an existing task",
          operationId: "tasksDelete",
          responses: {
            "204": {
              description: "Task deleted response",
            },
            default: {
              description: "Generic error response",
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        api_key: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
        openId: {
          type: "openIdConnect",
          description: "OpenID Connect",
        },
        oAuth: {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl: apiServerUrl + "/auth",
              tokenUrl: apiServerUrl + "/oauth/token",
              scopes: {
                admin:
                  " Grants read and write access to administrative information",
                write: " Grants write access",
                read: " Grants read access",
              },
            },
          },
        },
      },
    },
  },
} as SwaggerOptions;
