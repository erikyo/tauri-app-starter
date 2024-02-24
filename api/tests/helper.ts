// This file contains code that we reuse between our tests.
import fp from "fastify-plugin";
import fastify from "../src/app.js";
import { FastifyInstance } from "fastify";

// Fill in this config with all the configurations
// needed for testing the application
export async function config() {
  return {};
}

// Automatically build and tear down our instance
export function fsBuild() {
  let app: FastifyInstance;
  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup

  beforeAll(async () => {
    app = await fastify();
    // @ts-ignore
    void app.register(fp(app), await config());
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  return app;
}
