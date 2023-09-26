const mongoose = require('mongoose');

const consigneeSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    direccion: {
      type: String
    },
    direccion2: {
      type: String
    },
    direccion3: {
        type: String
    },
    taxId: {
      type: String
    },
    country: {
      type: String
    }
  });

module.exports = mongoose.model('Consignee', consigneeSchema);