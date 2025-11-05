import { boostrap } from "./helper.js";
import { describe, expect, test, beforeAll } from "vitest";

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
      .inject({ method: "GET", url: "/shipment" })
      .then((res: { statusCode: any; payload: any }) => {
        expect(res.statusCode).toBe(200);
        shipmentCount = res.payload.length;
        expect(shipmentCount).toBeTruthy();
      });
  });

  test("add a todo", () => {
    app
      .inject({
        method: "PUT",
        url: "/shipment",
        payload: { shipment_name: "test1", shipment_content: "test content" },
      })
      .then((res: { statusCode: any; payload: any }) => {
        expect(res.statusCode).toBe(200);
        expect(res.payload).toBeTruthy();
        shipmentCount = res.payload;
      });

    app
      .inject({ method: "GET", url: "/shipment" })
      .then((res: { statusCode: any; payload: any }) => {
        expect(res.statusCode).toBe(200);
        expect(res.payload).toBeTruthy();
      });
  });
});
