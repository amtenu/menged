import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";
import { readDatabaseUrl } from "./src/env.js";

// Local development: load DATABASE_URL from the repo root .env.
// In CI and on AWS the variable is set by the environment and there is no .env file.
const rootEnvFile = "../../.env";
if (process.env.DATABASE_URL === undefined && existsSync(rootEnvFile)) {
  process.loadEnvFile(rootEnvFile);
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: readDatabaseUrl(),
  },
});
