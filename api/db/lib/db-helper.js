const mongoose = require('../config.js'),
      ObjectId = require('mongoose').Types.ObjectId;

const Election = require('../../models/Election.js'),
      Voter = require('../../models/Voter.js');

//Takes in any collection, and returns all
function findAllElection(res) {
  Election.find({})
  //Must populate referenced admin in election
  .populate('admin')
  //Must populate referenced voters in ballot
  .populate('ballots.voter')
  .exec( (err, elections) => {
    if (err) throw (err);
    res.json({elections});
  });
};

//Takes in election id and returns it
function findElectionById(electionId, res) {
  Election.findById(electionId, (err, election) => {
    if (err) throw (err);
    res.json({election});
  });
};

function findBallotById(electionId, ballotId, res) {
  // const query = { campaign_id: new ObjectId(campaign._id) };
  const query = {'ballots._id': ObjectId(ballotId)}
  Election.find(query, (err, ballot) => {
    if (err) throw (err);
    res.json({ballot});
  })
}

module.exports = {
  findAllElection,
  findElectionById,
  findBallotById
}
