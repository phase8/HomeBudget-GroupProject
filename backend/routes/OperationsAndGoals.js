const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');
const TotalModel = require('../models/TotalModel');
const IncomeExpense = require('../models/IncomeExpense');

router.get('/getblogpost', (req, res) => {
  BlogPost.find({})
    .then(data => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch(error => {
      console.log('error: ', daerrorta);
    });
});

router.get('/total', (req, res) => {
  TotalModel.find({})
    .then(data => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch(error => {
      console.log('error: ', daerrorta);
    });
});

router.post('/savetarget', (req, res) => {
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save(error => {
    if (error) {
      res.status(500).json({
        msg: 'Sorry, internal server errors'
      });
      return;
    }
    return res.json({
      msg: 'Your data has been saved!!!!!!'
    });
  });
});

router.post('/saveincomeexpense', (req, res) => {
  const data = req.body;
  const NewIncomeExpense = new IncomeExpense(data);

  NewIncomeExpense.save(error => {
    if (error) {
      res.status(500).json({
        msg: 'Sorry, internal server errors'
      });
      return;
    }
    return res.json({
      msg: 'Your data has been saved!!!!!!'
    });
  });
});

router.delete('/removetarget', function(req, res) {
  BlogPost.findOneAndRemove(
    {
      _id: req.body.id
    },
    req.body,
    function(err, data) {
      if (!err) {
        console.log('Deleted');
      }
    }
  );
});

module.exports = router;
