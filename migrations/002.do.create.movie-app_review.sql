CREATE TABLE  reviews (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL,
  date_created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  date_modified TIMESTAMP WITH TIME ZONE,
  user_id INTEGER REFERENCEs users(id) ON DELETE CASCADE NOT NULL,
  movie_id TEXT NOT NULL
);