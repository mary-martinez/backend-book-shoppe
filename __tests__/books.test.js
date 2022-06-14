const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');


describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books with their released date', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(3);
    const vampire = res.body.find((book) => book.id === '1');
    expect(vampire).toHaveProperty('title', 'Dead Assessments');
    expect(vampire).toHaveProperty('released', 2018);
  });

  it('/books/:id should return book details, including authors id and name', async () => {
    const res = await request(app).get('/books/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual('1');
    expect(res.body.title).toEqual('Dead Assessments');
    expect(res.body.released).toEqual(2018);
    expect(res.body).toHaveProperty('authors');
  });

  afterAll(() => {
    pool.end();
  });

});
