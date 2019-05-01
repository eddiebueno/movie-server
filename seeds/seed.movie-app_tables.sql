BEGIN;

TRUNCATE
  movies,
  users,
  folders,
  folders_movies
  RESTART IDENTITY CASCADE;

INSERT INTO movies(movie_name, image_url)
VALUES
  ('Avengers Endgame','https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300'),
  ('Star Wars Episode IX','https://m.media-amazon.com/images/M/MV5BNjEyMjE5MTUwNV5BMl5BanBnXkFtZTgwNzY0NTA0NzM@._V1_SX300'),
  ('Spider-Man: Far From Home','https://m.media-amazon.com/images/M/MV5BZjBhYWNiMDQtYjRmYy00NzEzLTg1MDYtYzg3YzRkZmRkYjY3XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300');

INSERT INTO users(user_name,password)
  VALUES
  ('eddie','Bueno!123');

INSERT INTO folders(folder_name,user_id)
  VALUES
  ('To Watch',1),
  ('Seen',1);

INSERT INTO folders_movies(folder_id,movie_id)
  VALUES
  (1,2),
  (1,3),
  (2,1);

  COMMIT;