const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const author = await Author.insert(req.body);
      if (req.body.bookIds) {
        await Promise.all(req.body.bookIds.map((id) => author.addBookById(id)));
      }
      res.json(author);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const author = await Author.getById(req.params.id);
      res.json(author);
    } catch (e) {
      next(e);
    }

  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.json(authors);
  });
