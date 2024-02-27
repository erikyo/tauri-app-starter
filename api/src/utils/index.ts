import { config } from "dotenv";
import path from "node:path";

export function getEnv() {
  console.log("Running NODE_ENV: " + process.env.NODE_ENV ?? "development");

  if (process.env.NODE_ENV === "production") {
    config({ path: path.resolve(".env.production") });
  } else if (process.env.NODE_ENV === "docker") {
    config({ path: path.resolve(".env") });
  } else {
    config({ path: path.resolve("../.env") });
  }
}
