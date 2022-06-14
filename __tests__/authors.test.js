const setup = require('../data/setup');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of authors names', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(2);
    const sarah = res.body.find((author) => author.id === '2');
    expect(sarah).toHaveProperty('name', 'Sarah J Maas');
  });

  afterAll(() => {
    pool.end();
  });

});
