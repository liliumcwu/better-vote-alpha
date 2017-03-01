const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
  fName: String,
  email: String
})

module.exports = mongoose.model('Voter', VoterSchema);
