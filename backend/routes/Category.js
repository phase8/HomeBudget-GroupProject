const express = require("express");
const router = express.Router();
const CategoryModel = require("../models/CategoryModel").CategoryModel;

router.post("/", (req, res) => {
  const data = req.body;
  const newCategory = new CategoryModel(data);

  newCategory.save(error => {
    if (error) {
      res.status(500).json({
        error: "An error has occured while creating new category"
      });
      return;
    }
    return res.json(newCategory);
  });
});

router.get("/", (req, res) => {
  const filter = req.query.type;
  let email = req.query.email;

  CategoryModel.find({ userid: email, type: filter })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({
        error: "An error has occured while fetching categories"
      });
    });
});

router.delete("/:id", async (req, res) => {
  let record = req.params.id;

  const done = await CategoryModel.findByIdAndDelete({ _id: record });
  if (!done) return res.status(404).send("Something went wrong! Try again");
  res.send("Category deleted!");
});

module.exports = router;
