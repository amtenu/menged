-- Runs once, the first time the local database volume is created.
-- Tables are NOT created here: schema lives in migrations (Drizzle, week 3).
-- To re-run: pnpm db:down && docker volume rm menged_pgdata && pnpm db:up

CREATE EXTENSION IF NOT EXISTS vector;

-- Read-only role the Python matching service will use (week 7).
-- Local password only; production credentials come from Secrets Manager.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'matching_ro') THEN
    CREATE ROLE matching_ro LOGIN PASSWORD 'matching_ro_local';
  END IF;
END
$$;

GRANT CONNECT ON DATABASE menged TO matching_ro;
GRANT USAGE ON SCHEMA public TO matching_ro;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO matching_ro;
