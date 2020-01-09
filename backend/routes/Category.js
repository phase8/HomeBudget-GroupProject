const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/CategoryModel').CategoryModel;

router.post('/', (req, res) => {
  const data = req.body;
  const newCategory = new CategoryModel(data);

  newCategory.save(error => {
    if (error) {
      res.status(500).json({
        error: 'An error has occured while creating new category'
      });
      return;
    }
    return res.json(newCategory);
  });
});

router.get('/', (req, res) => {
  const filter = req.query.type ? { type: req.query.type } : {};

  CategoryModel.find(filter)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({
        error: 'An error has occured while fetching categories'
      });
    });
});

router.delete('/:id', (req, res) => {
  CategoryModel.findByIdAndRemove({
    _id: req.params.id
  }).then(obj => res.send(obj));
});

module.exports = router;
