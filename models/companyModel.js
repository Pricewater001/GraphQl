const { default: mongoose } = require("mongoose");

const CompanySchema = new mongoose.Schema({
  id: Number,
  name: String,
  location: String,
  rank: Number,

});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
