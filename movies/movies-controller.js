const movieList = require('./movies-data.json');

const filterByGenre = (movies, genre) => {
  return movies.filter(movie => {
    return movie.genre.toLowerCase().includes(genre)
  })
}

const filterByCountry = (movies, country) => {
  return movies.filter(movie => {
    return movie.country.toLowerCase().includes(country)
  })
}

const filterByRating = (movies, rating) => {
  return movies.filter(movie => {
    return movie.avg_vote >= +rating
  })
}


exports.filterMoviesByGenre = (req, res, next) => {
  const { genre  } = req.query
  let movies = movieList

  if (!genre) {
    req.movies = movies
    next()
  }

  movies = filterByGenre(movies, genre)
  req.movies = movies
  next();
}

exports.filterMoviesByCountry = (req, res, next) => {
  const { country  } = req.query

  if (!country) {
    next()
  }

  req.movies = filterByCountry(movies, country)
  next();
}

exports.filterMoviesByRating = (req, res, next) => {
  const { avg_vote } = req.query

  if (!avg_vote) {
    next()
  }

  req.movies = filterByRating(movies, avg_vote)
  next();
}

exports.getMovies = (req, res) => {
  res.status(200).json(req.movies);
}

exports.validateRequest = (req, res, next) => {
  const apiToken = proccess.env.API_TOKEN;
  const requestToken = req.get('Authorization')

  if (requestToken !== apiToken) {
    return res.status(401).send('Authorization failed')
  }

  next()
}








