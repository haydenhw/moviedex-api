const httpMocks = require("node-mocks-http")
const MovieController = require("../../movies-controller")
const movieList = require('../../movies-data.json')


describe("MovieController.getMovies", () => {
  const goodToken = 'Bearer MY-API-TOKEN'
  const badToken = 'Bearer BAD-API-TOKEN'
  let req, res, next;
  beforeEach(() => {
    req = httpMocks.createRequest({headers: { Authorization: goodToken}});
    res = httpMocks.createResponse();
    next = null;
  });

  it("should have a getMovies method", () => {
    expect(typeof MovieController.getMovies).toBe('function')
  })

  it("should return an array of movies when called with req.body.movies", () => {
      MovieController.getMovies(req, res)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toStrictEqual(movieList);
  })

  it("should send status 401 if valid token is not included with request", () => {
    req = httpMocks.createRequest({headers: { Authorization: badToken }});
    MovieController.getMovies(req, res)
    expect(res.statusCode).toBe(401)
  })

})
