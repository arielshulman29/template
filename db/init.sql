-- DEVELOPMENT ONLY: sets up the local database from compose.dev.yaml.
-- Postgres runs this file once, the first time the container starts with an
-- empty volume (reset with: pnpm db:reset). It is never run in production:
-- there, schema changes are applied with migrations.
CREATE TABLE rooms (
  id         SERIAL PRIMARY KEY,
  name       TEXT    NOT NULL,
  free_seats INTEGER NOT NULL DEFAULT 0
);

INSERT INTO rooms (name, free_seats) VALUES
  ('Study room 1', 4),
  ('Study room 2', 0),
  ('Study room 3', 6);
