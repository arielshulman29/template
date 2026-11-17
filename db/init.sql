-- Runs once, the first time the database container starts with an empty volume.
CREATE TABLE rooms (
  id         SERIAL PRIMARY KEY,
  name       TEXT    NOT NULL,
  free_seats INTEGER NOT NULL DEFAULT 0
);

INSERT INTO rooms (name, free_seats) VALUES
  ('Study room 1', 4),
  ('Study room 2', 0),
  ('Study room 3', 6);
