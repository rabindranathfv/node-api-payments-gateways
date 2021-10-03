/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

describe('Health Services', () => {
  test('It should response 200 OK with GET /v1/health', done => {
    request(app)
      .get('/v1/health')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});