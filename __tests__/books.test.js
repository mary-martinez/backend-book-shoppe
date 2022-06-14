const setup = require('../data/setup');
const { request } = require('../lib/app');
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

  afterAll(() => {
    pool.end();
  });

});
