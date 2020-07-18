const express = require('express');
const router = express.Router();

const controller = require('./movies-controller');

router.get('/',
  controller.validateRequest,
  controller.filterMoviesByGenre,
  controller.filterMoviesByCountry,
  controller.filterMoviesByRating,
  controller.getMovies,
);

module.exports = router;
