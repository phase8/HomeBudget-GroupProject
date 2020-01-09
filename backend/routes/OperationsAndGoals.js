const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');
const IncomeExpense = require('../models/IncomeExpense');
const CategoryModel = require('../models/CategoryModel').CategoryModel;




router.get('/getblogpost', (req, res) => {

    BlogPost.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/getCategoriesToAddIncomeExpense', (req, res) => {


    CategoryModel.find({
            type: "EXPENSE"
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).json({
                error: 'An error has occured while fetching categories'
            });
        });
});

router.get('/getBalance', (req, res) => {

    IncomeExpense.find({
            operationtype: "przychód"
        })
        .then((data) => {

            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});



router.post('/savetarget', (req, res) => {
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) => {
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






router.post('/saveincomeexpense', (req) => {

    const data = req.body;

    let ask = data.ispernament

    if (ask === "tak") {
        setInterval(function () {

            const NewIncomeExpense = new IncomeExpense(data);
            NewIncomeExpense.save();
            console.log("ok")

        }, 20000);
        console.log("ok")
    } else {
        const NewIncomeExpense = new IncomeExpense(data);
        NewIncomeExpense.save()
    }


})





router.delete("/removetarget", function (req, res) {
    BlogPost.findOneAndRemove({
        _id: req.body.id
    }, req.body, function (err, data) {
        if (!err) {
            console.log("Deleted");
        }
    });
});



module.exports = router;