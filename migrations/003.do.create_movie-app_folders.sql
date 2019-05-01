CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  folder_name TEXT NOT NULL,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE 
  folders_movies (
    folder_id INTEGER REFERENCES  folders(id),
    movie_id INTEGER REFERENCES movies(id)
  );
