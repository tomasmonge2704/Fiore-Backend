const mongoose = require('mongoose');

const empleadosSchema = new mongoose.Schema({
  nombre:String,
  apellido:String,
  celular:String,
  mail:String
});


module.exports = mongoose.model('Empleados', empleadosSchema);