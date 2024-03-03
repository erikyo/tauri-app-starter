import { boostrap } from "./helper.js";
import { beforeAll } from "@jest/globals";

describe("root tests", () => {
  let app: any;
  beforeAll(async () => {
    app = await boostrap();
    return app;
  });

  afterAll(async () => {
    return await app.close();
  });

  test("server is alive", () => {
    app
      .inject({ method: "GET", url: "/" })
      .then((res: { statusCode: any; payload: any }) => {
        expect(res.statusCode).toBe(200);
        expect(res.payload).toEqual("hello");
      });
  });

  test("get the list of todos ", () => {
    app
      .inject({ method: "GET", url: "/task" })
      .then((res: { statusCode: any; payload: any }) => {
        expect(res.statusCode).toBe(200);
        const taskCount = res.payload.length;
        expect(taskCount).toBeTruthy();
      });
  });
});
