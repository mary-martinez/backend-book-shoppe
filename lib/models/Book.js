const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    if (row.authors) {
      this.authors = row.authors;
    }
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    SELECT
    books.*,
    COALESCE (
      json_agg(to_jsonb(authors))
      FILTER (WHERE authors.id IS NOT NULL), '[]'
    ) as authors from books
    LEFT JOIN books_authors on books.id = books_authors.book_id
    LEFT JOIN authors on books_authors.author_id = authors.id
    WHERE books.id = $1
    GROUP BY books.id`, [id]);
    // console.log('rows', rows);
    return new Book(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(`
    INSERT INTO books
    (title, released)
    VALUES ($1, $2)
    RETURNING *
    `, [title, released]);
    return new Book(rows[0]);
  }

  async addAuthorById(authorId) {
    await pool.query(`
    INSERT INTO books_authors
    (book_id, author_id)
    VALUES ($1, $2)
    RETURNING *
    `, [this.id, authorId]);
    return this;
  }
}

module.exports = { Book };
