-- Custom SQL migration file, put your code below! --
-- Enable pgvector. Local docker also does this in db/init, but RDS does
-- not run init scripts, so the migration is the source of truth.
CREATE EXTENSION IF NOT EXISTS vector;
