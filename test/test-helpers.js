'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray(){
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeMoviesArray(){
  return [
    {
      Poster:
      'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      Title:
      'The Avengers',
      Type:
      'movie',
      Year:
      '2012',
      imdbID:
      'tt0848228'},
    {
      Poster:
'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg',
      Title:
'Avengers: Age of Ultron',
      Type:
'movie',
      Year:
'2015',
      imdbID:
'tt2395427',
    }
  ];
}

function makeReviewsArray(users,movies){
  return [
    {
      id:1,
      rating:10,
      text:'first review',
      movie_id:1,
      user_id:1,
      date_created:'2029-01-22T16:28:32.615Z'
    },
    {
      id:2,
      rating:3,
      text:'second review',
      movie_id:2,
      user_id:1,
      date_created:'2029-01-22T16:28:32.615Z'
    },
    {
      id:3,
      rating:7,
      text:'3rd review',
      movie_id:1,
      user_id:2,
      date_created:'2029-01-22T16:28:32.615Z'
    },
  ];
}

function makeMoviesFixtures() {
  const testUsers = makeUsersArray();
  const testMovies = makeMoviesArray();
  const testReviews = makeReviewsArray(testUsers, testMovies);
  return { testUsers, testMovies, testReviews };
}

function makeExpectedMovieReviews(users, movieId, reviews) {
  const expectedReviews = reviews
    .filter(review => review.movie_id === movieId);

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id);
    return {
      id: review.id,
      text: review.text,
      rating: review.rating,
      date_created: review.date_created,
      user: {
        id: reviewUser.id,
        user_name: reviewUser.user_name,
        date_created: reviewUser.date_created,
      }
    };
  });
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db.into('users').insert(preppedUsers)
    .then(() => {
      db.raw(
        `SELECT setval('users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    });
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET){
  const token = jwt.sign({user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256'
  });
  return `Bearer ${token}`
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      reviews
      RESTART IDENTITY CASCADE`
  )
}


module.exports = {
  makeUsersArray,
  makeMoviesArray,
  makeExpectedMovieReviews,
  makeReviewsArray,

  makeMoviesFixtures,
  cleanTables,
  makeAuthHeader,
  seedUsers,
}