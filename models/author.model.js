const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const AuthorModel = mongoose.model("Author", authorSchema);

module.exports = AuthorModel;