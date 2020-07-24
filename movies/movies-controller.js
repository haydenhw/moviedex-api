const MovieUtil = require('./movies-utils');

module.exports.getAllMoviesIfNoFilterSupplied = (req, res, next) => {
  const { genre, country, avg_vote } = req.query;
  if (genre || country || avg_vote) {
    next()
  } else {
    const movieList = MovieUtil.getMovieData(process.env.NODE_ENV)
    return res.json(movieList)
  }
}

 module.exports.getFilteredMovies = (req, res) => {
   const { genre, country, avg_vote } = req.query;
   let movies = MovieUtil.getMovieData(process.env.NODE_ENV)

   if (genre) {
      movies = MovieUtil.filterByGenre(movies, genre)
   }

   if (country) {
     movies = MovieUtil.filterByCountry(movies, country)
   }

   if (avg_vote) {
     movies = MovieUtil.filterByRating(movies, avg_vote)
   }

   return res.json(movies)
}

module.exports.validateRequest = (req, res, next) => {
  const requestToken = req.get('Authorization')
  if (requestToken !== process.env.API_TOKEN) {
    return res.status(401).send('Authorization failed')
  }

  next()
}








