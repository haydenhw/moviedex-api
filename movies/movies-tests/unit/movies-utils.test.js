const httpMocks = require("node-mocks-http")
const MovieUtil = require("../../movies-utils")
const mockMovieList = require('../mock-data/movies-data.json')
const movieList = require('../../movies-data');

describe("MovieUtil.getMovieData", () => {
  it('should exist', () => {
    expect(typeof MovieUtil.getMovieData).toBe('function')
  })
  it('should return movies-tests data if NODE_ENV = movies-tests', () => {
    const result = MovieUtil.getMovieData('test')
    expect(result[0]).toStrictEqual(mockMovieList[0])
    expect(result.length).toEqual(mockMovieList.length)
  })
  it('should return full dataset if NODE_ENV != movies-tests', () => {
    const result = MovieUtil.getMovieData(null)
    expect(result[0]).toStrictEqual(movieList[0])
    expect(result.length).toEqual(movieList.length)
  })
})

describe("MovieUtil.filterByGenre", () => {
  it('should exist', () => {
    expect(typeof MovieUtil.filterByGenre).toBe('function')
  })

  it('should return only comedy movies when called with genre=comedy', () => {
    const result = MovieUtil.filterByGenre(mockMovieList, 'comedy')
    expect(result).toBeDefined()
    expect(result[0].genre.includes('Comedy')).toBe(true)
    expect(result[1].genre.includes('Comedy')).toBe(true)
  })

  it('should return only movies from Austria when called with country=Austria', () => {
    const result = MovieUtil.filterByCountry(mockMovieList, 'austria')
    expect(result).toBeDefined()
    expect(result[0].country.includes('Austria')).toBe(true)
    expect(result[1].country.includes('Austria')).toBe(true)
  })

  it('should return only movies with avg_rating greater or equal to 6  called with avg_vote=6', () => {
    const result = MovieUtil.filterByRating(mockMovieList, 6)
    expect(result).toBeDefined()
    expect(result[0].avg_vote >= 6).toBe(true)
    expect(result[1].avg_vote >= 6).toBe(true)
  })
})














