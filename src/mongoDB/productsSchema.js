const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
    family: {
      type: String,
      required: true
    },
    famili2: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('products', proveedorSchema);