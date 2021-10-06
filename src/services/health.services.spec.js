const request = require('supertest');
const app = require('../app');

jest.useRealTimers();

describe('Health Services', () => {
  it('It should response 200 OK with GET /v1/health', done => {
    request(app)
      .get('/v1/health')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});