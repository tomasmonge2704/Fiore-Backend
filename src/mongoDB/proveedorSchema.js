const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
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
  taxId: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.trim().length > 0, // Valida que no esté vacío
      message: 'El campo "taxId" no puede estar vacío.'
    }
  },
  plantNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.trim().length > 0, // Valida que no esté vacío
      message: 'El campo "plantNumber" no puede estar vacío.'
    }
  },
  brand: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.trim().length > 0, // Valida que no esté vacío
      message: 'El campo "brand" no puede estar vacío.'
    }
  },
  emoji: {
    type: String
  }
});


module.exports = mongoose.model('Proveedores', proveedorSchema);