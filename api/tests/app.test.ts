import { boostrap } from "./helper.js";

describe("root tests", () => {
  const app = boostrap();

  test("default root route", async () => {
    const res = await app.inject("/");
    console.log(res);
    expect(res.payload).toEqual("hello");
  });
});
