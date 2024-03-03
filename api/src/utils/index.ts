import { config } from "dotenv";
import path from "node:path";

export function getEnv(env?: string) {
  console.log("Running NODE_ENV: " + process.env.NODE_ENV ?? "development");

  if (process.env.NODE_ENV === "test") {
    config({ path: path.resolve(".env.test") });
  } else if (process.env.NODE_ENV === "production") {
    config({ path: path.resolve(".env.production") });
  } else if (process.env.NODE_ENV === "docker") {
    config({ path: path.resolve(".env") });
  } else {
    config({ path: path.resolve("../.env") });
  }
}
