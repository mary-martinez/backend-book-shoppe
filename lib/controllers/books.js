const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.getById(req.params.id);
      console.log('book', book);
      res.json(book);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  });
