'use strict';
const xss = require('xss');

const ReviewsService = {
  getById(db,id){
    return db 
      .from('reviews as r')
      .select(
        'r.id',
        'r.rating',
        'r.text',
        'r.date_created',
        'r.movie_id',
        db.raw(
          `row_to_json(
            (SELECT tmp FROM (
              SELECT 
              usr.id,
              usr.user_name,
              usr.date_created,
              usr.date_modified
            ) tmp)
          ) AS "user"`
        )
      )
      .leftJoin(
        'users as usr',
        'r.user_id',
        'usr.id'
      )
      .where('r.id',id)
      .first();
  },

  getReviewsForUser(db,user_id){
    return db
      .from('reviews as r')
      .select('*')
      .where('r.user_id',user_id);
  },

  getAllReviews(db){
    return db
      .from('reviews as r')
      .select('*');
  },
  
  getReviewsForMovie(db,movie_id){
    return db
      .from('reviews as r')
      .select('*')
      .where('r.movie_id',movie_id);
  },

  insertReview(db, newReview){
    return db
      .insert(newReview)
      .into('reviews')
      .returning('*')
      .then(([review])=> review)
      .then(review=>ReviewsService.getById(db,review.id));
  },
  serializeReviews(reviews){
    return reviews.map(this.serializedReview);
  },
  serializedReview(review){
    console.log(review);
    return{
      id:review.id,
      rating: review.rating,
      text: xss(review.text),
      movie_id: review.movie_id,
      date_created: review.date_created,
      user: review.user || {},
    };
  }

};

module.exports = ReviewsService;