const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
  fName: String,
  email: String,
  hasVoted: {type: Boolean, default: false }
})

module.exports = mongoose.model('Voter', VoterSchema);
