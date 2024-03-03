// This file contains code that we reuse between our tests.
import fastify from "../src/app.js";
import { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";

import path from "node:path";

// Automatically build and tear down our instance
export async function boostrap(): Promise<FastifyInstance> {
  let app: FastifyInstance;
  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  process.env.NODE_ENV = "test";
  dotenv.config({ path: path.resolve("../.env.test") });
  app = await fastify();
  await app.listen();
  return app;
}
