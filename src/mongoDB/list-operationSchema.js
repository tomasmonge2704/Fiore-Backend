const mongoose = require("mongoose");

const listOperationSchema = new mongoose.Schema({
  state: String,
  refNumber: {
    type: String,
    required: true,
    unique: true,
  },
  empresa: String,
  empleado:String,
  shipper: String,
  buyer: String,
  pay: String,
  charged: String,
  timeToArrival: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("list-operations", listOperationSchema);
