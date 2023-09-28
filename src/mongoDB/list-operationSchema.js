const mongoose = require('mongoose');

const listOperationSchema = new mongoose.Schema({
  state:String,
  refNumber:String,
  empresa:String,
  cashback:String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('list-operations', listOperationSchema);