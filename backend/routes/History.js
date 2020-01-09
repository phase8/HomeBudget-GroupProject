const express = require('express');
const router = express.Router();
const IncomeExpense = require('../models/IncomeExpense');
const BlogPost = require('../models/blogPost');

router.get('/get', (req, res) => {

    IncomeExpense.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', dataerror);
        });
});

router.get('/checkbalance', (req, res) => {

    IncomeExpense.find({})
        .select({amount: 1, operationtype: 1})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', dataerror);
        });
})



module.exports = router;