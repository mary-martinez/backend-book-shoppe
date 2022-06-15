const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const author = await Author.getById(req.params.id);
      console.log('author', author);
      res.json(author);
    } catch (e) {
      next(e);
    }

  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.json(authors);
  });
