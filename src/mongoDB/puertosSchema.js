const mongoose = require('mongoose');

const objSchema = new mongoose.Schema({
  port: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  region: {
    type: String,
  },
  pod:{
    type:String
  }
});

module.exports = mongoose.model('puertos', objSchema);