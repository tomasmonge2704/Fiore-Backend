const mongoose = require('mongoose');

const objSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('shipping-line', objSchema);