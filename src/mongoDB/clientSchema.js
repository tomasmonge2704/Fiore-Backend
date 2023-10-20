const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  direccion2: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  vatNumber: {
    type: String,
    required: true
  },
  emoji:{
    type:String
  }
});

module.exports = mongoose.model('Client', clientSchema);
