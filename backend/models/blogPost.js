const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: Number,
  userid: String,
  date: {
    type: String,
    default: Date.now()
  }

});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;