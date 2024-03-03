import { boostrap } from "./helper.js";
import { beforeAll } from "@jest/globals";

describe("root tests", () => {
  let app: any;
  let taskCount: number = 0;
  beforeAll(async () => {
    app = await boostrap();
    return app;
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
        taskCount = res.payload.length;
        expect(taskCount).toBeTruthy();
      });
  });

  test("add a todo", () => {
    app
      .inject({
        method: "PUT",
        url: "/task",
        payload: { task_name: "test1", task_content: "test content" },
      })
      .then((res: { statusCode: any; payload: any }) => {
        expect(res.statusCode).toBe(200);
        expect(res.payload).toBeTruthy();
        taskCount = res.payload;
      });

    app
      .inject({ method: "GET", url: "/task" })
      .then((res: { statusCode: any; payload: any }) => {
        expect(res.statusCode).toBe(200);
        expect(res.payload).toBeTruthy();
      });
  });
});
