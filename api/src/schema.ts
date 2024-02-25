import { SwaggerOptions } from "@fastify/swagger";

const apiServerUrl =
  "http://" + process.env.HTTP_HOST + ":" + process.env.HTTP_PORT;

export const schema = {
  swagger: {
    openapi: "3.0.1",
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
      },
    ],
    tags: [
      {
        name: "task",
        description: "Task management",
      },
    ],
    routePrefix: "/api/v1",
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
        post: {
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
            description: "The id of the task",
            required: true,
            schema: {
              type: "string",
            },
            example: "15",
          },
        ],
        get: {
          tags: ["task"],
          summary: "Get a single task based on its id",
          operationId: "tasksRead",
          responses: {
            "200": {
              description: "Ok",
            },
            default: {
              description: "Generic error response",
            },
          },
        },
        put: {
          tags: ["task"],
          summary: "Update an existing task",
          operationId: "tasksUpdate",
          responses: {
            "200": {
              description: "The updated task",
            },
            default: {
              description: "Generic error response",
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
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
        openId: {
          type: "openIdConnect",
          description: "OpenID Connect",
        },
        oAuth: {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl: apiServerUrl + "/authorize",
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
    refResolver: {
      buildLocalReference(json, baseUri, fragment, i) {
        return json.$id || `id-${i}`;
      },
    },
  },
} as SwaggerOptions;
