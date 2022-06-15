const setup = require('../data/setup');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/authors should return a list of authors names', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(2);
    const sarah = res.body.find((author) => author.id === '2');
    expect(sarah).toHaveProperty('name', 'Sarah J Maas');
  });

  it('/authors/:id should return author details, including associated books', async () => {
    const res = await request(app).get('/authors/2');
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual('2');
    expect(res.body.name).toEqual('Sarah J Maas');
    expect(res.body.dob).toEqual(1986);
    expect(res.body.pob).toEqual('Manahattan, New York');
    expect(res.body).toHaveProperty('books');
  });

  afterAll(() => {
    pool.end();
  });

});
