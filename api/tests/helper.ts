// This file contains code that we reuse between our tests.
import fastify from "../src/app.js";
import { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";

import path from "node:path";

// Automatically build and tear down our instance
export function boostrap() {
  let app: FastifyInstance;
  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup

  beforeAll(async () => {
    dotenv.config({ path: path.resolve("../.env.test") });
    app = await fastify();
    return app.listen();
  });

  afterAll(async () => {
    return await app.close();
  });

  return app;
}
