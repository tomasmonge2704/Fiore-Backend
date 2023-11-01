const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.trim().length > 0, // Valida que no esté vacío
      message: 'El campo "nombre" no puede estar vacío.'
    }
  },
  direccion: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.trim().length > 0, // Valida que no esté vacío
      message: 'El campo "direccion" no puede estar vacío.'
    }
  },
  direccion2: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.trim().length > 0, // Valida que no esté vacío
      message: 'El campo "direccion2" no puede estar vacío.'
    }
  },
  country: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.trim().length > 0, // Valida que no esté vacío
      message: 'El campo "country" no puede estar vacío.'
    }
  },
  vatNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.trim().length > 0, // Valida que no esté vacío
      message: 'El campo "vatNumber" no puede estar vacío.'
    }
  },
  emoji: {
    type: String
  }
});

module.exports = mongoose.model('Client', clientSchema);
