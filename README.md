# Movie Reviews API

## Summary
An Express server used for my [Movie Reviews React app](https://github.com/eddiebueno/movie-manager-app).

## API Documentation

### POST /login
User login. Requires a body with parameters _user_name_ and _password_.

### POST /users
Create a user. Requires a body with parameters _user_name_ and _password_.

### GET /users/:user_id/reviews
View all of a user's reviews. No paramaters needed.

### POST /reviews
Create a review. Requires a body with _movie_id_, _rating_, and _text_.

### GET /reviews
View all the reviews/ No parameters needed.

### GET /reviews/:movie_id
View a review for a specific movie.
