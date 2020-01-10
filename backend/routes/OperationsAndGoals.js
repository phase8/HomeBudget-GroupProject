const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogPost");
const IncomeExpense = require("../models/IncomeExpense");
const CategoryModel = require("../models/CategoryModel").CategoryModel;

router.get("/getblogpost", (req, res) => {
  let email = req.query.email;
  BlogPost.find({ userid: email }).then(data => {
    res.json(data);
  });
});

router.get("/getCategoriesToAddIncomeExpense", (req, res) => {
  CategoryModel.find({
    type: "EXPENSE"
  }).then(data => {
    res.json(data);
  });
});

router.get("/getBalancePlus", (req, res) => {
  let email = req.query.email;
  IncomeExpense.find({ userid: email, operationtype: /przychód/ }).then(
    data => {
      res.json(data);
    }
  );
});

router.get("/getBalanceMinus", (req, res) => {
  let email = req.query.email;
  IncomeExpense.find({ userid: email, operationtype: /wydatek/ }).then(data => {
    res.json(data);
  });
});

router.post("/savetarget", (req, res) => {
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save(error => {
    if (error) {
      res.status(500).json({});
      return;
    }
    return res.json({});
  });
});

router.post("/saveincomeexpense", req => {
  const data = req.body;

  let ask = data.ispernament;

  if (ask === "tak") {
    const NewIncomeExpense = new IncomeExpense(data);
    NewIncomeExpense.save();

    setInterval(function() {
      const NewIncomeExpense = new IncomeExpense(data);
      NewIncomeExpense.save();
    }, 60480000);
  } else {
    const NewIncomeExpense = new IncomeExpense(data);
    NewIncomeExpense.save();
  }
});

router.delete("/removetarget", function(req, res) {
  BlogPost.findOneAndRemove(
    {
      _id: req.body.id
    },
    req.body,
    function(err, data) {
      if (!err) {
        console.log("");
      }
    }
  );
});

module.exports = router;
