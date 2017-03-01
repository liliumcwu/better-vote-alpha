const mongoose = require('mongoose'),
      Voter = require('./Voter.js');

const BallotSchema = new mongoose.Schema({
  voter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Voter' }],
  votes: [],
  url: String,
  voteDate: { type: Date, default: Date.now }
})

const ElectionSchema = mongoose.Schema({
  electionTitle: String,
  admin: String,
  ballots: [BallotSchema],
  url: String,
  candidates: [],
  hasClosed: {type: Boolean, default: false },
  electionStart: { type: Date, default: Date.now },
  electionClose: Date
  // timestamps: true
});

module.exports = mongoose.model('Election', ElectionSchema);
