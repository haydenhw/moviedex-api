require('dotenv').config()
const httpMocks = require("node-mocks-http")
const MovieController = require("../../movies-controller")
const MovieUtil = require("../../movies-utils")
const mockMovieList = require('../mock-data/movies-data')
const moveList = require('../../movies-data')

const goodToken = process.env.API_TOKEN
const badToken = 'Bearer BAD-API-TOKEN'
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest({headers: { Authorization: goodToken}});
  res = httpMocks.createResponse();
  next = jest.fn();

  MovieUtil.filterByGenre = jest.fn();
  MovieUtil.filterByCountry = jest.fn();
  MovieUtil.filterByRating = jest.fn();
});

describe("MovieController.getAllMoviesIfNoFilterSupplied", () => {
  it("should be defined", () => {
    expect(typeof MovieController.getAllMoviesIfNoFilterSupplied).toBe('function')
  })

  it("should call next if a filter is defined", () => {
    req = httpMocks.createRequest({query: {genre: 'Comdey'}});
    MovieController.getAllMoviesIfNoFilterSupplied(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it("should return a list of all movies if no filter is defined", () => {
    req = httpMocks.createRequest({query: {}});
    MovieController.getAllMoviesIfNoFilterSupplied(req, res, next)
    expect(next).not.toHaveBeenCalled()
    expect(res._getJSONData()).toBeDefined()
    expect(res._getJSONData()[0]).toStrictEqual(mockMovieList[0])
    expect(res._getJSONData().length).toStrictEqual(mockMovieList.length)
  })
})

describe("MovieController.getFilteredMovies ", () => {
  it("should have a getFilteredMovies method", () => {
    expect(typeof MovieController.getFilteredMovies).toBe('function')
  })

  it("should return a json array", () => {
    MovieController.getFilteredMovies(req, res)
    expect(Array.isArray(res._getJSONData())).toBe(true)
  })

  it("should return only action movies when genre=Action", () => {
    req = httpMocks.createRequest({query: { genre: 'Action' }});
    MovieController.getFilteredMovies(req, res)
    expect(MovieUtil.filterByGenre).toHaveBeenCalled()
  })

  it("should return only action movies when genre=action", () => {
    req = httpMocks.createRequest({query: { genre: 'action' }});
    MovieController.getFilteredMovies(req, res)
    expect(MovieUtil.filterByGenre).toHaveBeenCalled()
  })

  it("should return movies from France  when country=France", () => {
    req = httpMocks.createRequest({query: { country: 'france' }});
    MovieController.getFilteredMovies(req, res)
    expect(MovieUtil.filterByCountry).toHaveBeenCalled()
  })

  it("should return movies with avg_rating above 5 when avg_vote=5", () => {
    req = httpMocks.createRequest({query: { avg_vote: 5 }});
    MovieController.getFilteredMovies(req, res)
    expect(MovieUtil.filterByRating).toHaveBeenCalled()

  })
})

describe("MovieController.validateRequest", () => {
  it("should send status 401 if valid token is not included with request", () => {
    req = httpMocks.createRequest({headers: { Authorization: badToken }});
    MovieController.validateRequest(req, res)
    expect(res.statusCode).toBe(401)
  })

  it("should call next if correct token is supplied", () => {
    req = httpMocks.createRequest({headers: { Authorization: goodToken }});
    MovieController.validateRequest(req, res, next)
    expect(next).toHaveBeenCalled()
  })

})
