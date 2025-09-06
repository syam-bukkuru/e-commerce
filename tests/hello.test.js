const request = require('supertest');
const app = require('../server');

describe('Basic routes', () => {
  it('GET / should return Hello World message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/Hello World/);
  });

  it('GET /health should return 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });
});
