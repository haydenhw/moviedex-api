const request = require('supertest');
const app = require('../../../app');

const endpointUrl = "/movies/";

describe(endpointUrl, () => {
  it("POST" + endpointUrl, async () => {
    expect(true).toBe(true)
  })
});
