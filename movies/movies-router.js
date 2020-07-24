const express = require('express');
const router = express.Router();

const controller = require('./movies-controller');

router.get('/',
  controller.validateRequest,
  controller.getAllMoviesIfNoFilterSupplied,
  controller.getFilteredMovies,
);

module.exports = router;
