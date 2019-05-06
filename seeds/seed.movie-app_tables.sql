BEGIN;

TRUNCATE
  users,
  reviews
  RESTART IDENTITY CASCADE;

INSERT INTO users(user_name,password)
  VALUES
  ('bueno','$2a$12$yDbCoIlfimmPnpI5RurR4.RwHiHI.1bi2n825SGCjz13AkFC4rl5G');

INSERT INTO reviews(text,rating,user_id,movie_id)
  VALUES
  ('Movie was great. Would see again',10,1,'tt4154796'),
  ('Visuals were a little weird. Decent movie',5,1,'tt1477834');

  COMMIT;