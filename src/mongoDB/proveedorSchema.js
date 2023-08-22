const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
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
    taxId: {
      type: String,
      required: true
    },
    plantNumber: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('Proveedores', proveedorSchema);