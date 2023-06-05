const { default: mongoose } = require("mongoose");

const UsersSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  major: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

const User = mongoose.model("User", UsersSchema);

module.exports = User;
