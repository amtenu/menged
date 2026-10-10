export type Env = Readonly<Record<string, string | undefined>>;

export function readDatabaseUrl(env: Env = process.env): string {
  const value = env.DATABASE_URL?.trim();

  if (!value) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!value.startsWith("postgres://") && !value.startsWith("postgresql://")) {
    throw new Error(
      "DATABASE_URL must start with postgres:// or postgresql://",
    );
  }

  return value;
}
