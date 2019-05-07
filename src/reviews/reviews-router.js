'use strict';
const express = require('express');
const path = require('path');
const ReviewsService = require('./reviews-service');
const { requireAuth } = require('../middleware/jwt-auth');
const reviewsRouter = express.Router();
const jsonBodyParser = express.json();

reviewsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req,res,next)=>{
    const {movie_id, rating, text} = req.body;
    const newReview = {movie_id,rating,text};

    for (const [key,value] of Object.entries(newReview)){
      if (value === null){
        return res.status(400).json({
          error: `Missing ${key} in request body`
        });
      }
    }

    newReview.user_id = req.user.id;

    ReviewsService.insertReview(
      req.app.get('db'),
      newReview
    )
      .then(review=>{
        res
          .status(201)
          .location(path.posix.join(req.originalUrl)).json(ReviewsService.serializedReview(review));
      })
      .catch(next);
  });



reviewsRouter
  .route('/')
  .get((req,res,next)=>{
    ReviewsService.getAllReviews(req.app.get('db'))
      .then(reviews=>{
        res.json(ReviewsService.serializeReviews(reviews));
      })
      .catch(next);
  });

reviewsRouter
  .route('/:movie_id')
  .get((req,res,next)=>{
    ReviewsService.getReviewsForMovie(req.app.get('db'),req.params.movie_id)
      .then(reviews=>{
        return res.json(ReviewsService.serializeReviews(reviews));
      })
      .catch(next);
  });

module.exports = reviewsRouter;
