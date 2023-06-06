const { default: mongoose } = require("mongoose");

const PlogsSchema = new mongoose.Schema({
    id:Number,
    title: String,
    isTrue:Boolean,
    age:Number,
    country:String,
    description: String,
    comments:[],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  });

  const Plog = mongoose.model('Plog', PlogsSchema);

  module.exports = Plog;

