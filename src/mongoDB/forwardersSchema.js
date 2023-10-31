const mongoose = require('mongoose');

const objSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  shippingLine:String
});

module.exports = mongoose.model('forwarders', objSchema);