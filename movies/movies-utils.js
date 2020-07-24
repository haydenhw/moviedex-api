const mockMovieData = require('./movies-tests/mock-data/movies-data')
const movieData = require('./movies-data')

module.exports.getMovieData = (NODE_ENV) => {
  if (NODE_ENV === 'test') {
    return mockMovieData
  }
  return movieData
}

module.exports.filterByGenre = (movies, genre) =>
  movies.filter((movie) =>
    movie.genre.toLowerCase().includes(genre.toLowerCase())
  );


module.exports.filterByCountry = (movies, country) =>
  movies.filter(movie =>
    movie.country.toLowerCase().includes(country.toLowerCase())
  );


module.exports.filterByRating = (movies, rating) =>
  movies.filter(movie =>
    movie.avg_vote >= +rating
  );
