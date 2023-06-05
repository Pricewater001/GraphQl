const mongoose = require('mongoose');
const uri = `mongodb://hasan:1234@ac-20ugd3y-shard-00-00.oxdfawe.mongodb.net:27017,ac-20ugd3y-shard-00-01.oxdfawe.mongodb.net:27017,ac-20ugd3y-shard-00-02.oxdfawe.mongodb.net:27017/Data?ssl=true&replicaSet=atlas-2y37fe-shard-0&authSource=admin&retryWrites=true&w=majority`; // Replace with your MongoDB connection URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error); 
  });

  module.exports = mongoose.connection;

