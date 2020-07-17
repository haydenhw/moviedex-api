const AppController = require("../apps/apps-controller")
const httpMocks = require("node-mocks-http");
let appData = require('../apps/apps-data');



describe("AppController.getApps", () => {
  let req, res, next;
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
  });

  it("should have a getApps method", () => {
    expect(typeof AppController.getApps).toBe('function')
  })

  it("should return 200 status code", () => {
    AppController.getApps(req, res);
    expect(res.statusCode).toBe(200)
  })

  it("should return json data", () => {
    AppController.getApps(req, res);
    expect(res._getJSONData()).toStrictEqual(appData)
  })

  it("should return apps data in order of rating when sort param is supplied", () => {
    req.query.sort = 'rating'
    AppController.getApps(req, res);
    expect(res._getJSONData()[0].Rating).toBe(4.7)
    expect(res._getJSONData()[1].Rating).toBe(4.6)
  })

  it("should return apps data in order of apps when sort param is app", () => {
    req.query.sort = 'app'
    AppController.getApps(req, res);
    expect(res._getJSONData()[0].App).toEqual("Angry Birds Rio")
  })

  it("should filter apps by Action genre if respective param is supplied", () => {
    req.query.generes = 'Action';
    AppController.getApps(req, res);
    expect(res._getJSONData()[0].Genres).toEqual("Action")
    expect(res._getJSONData()[1].Genres).toEqual("Action")
  })
})
