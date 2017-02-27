const mongoose = require('mongoose');

const ElectionSchema = mongoose.Schema({
  name: String


});

module.exports = mongoose.model('Election', ElectionSchema);
