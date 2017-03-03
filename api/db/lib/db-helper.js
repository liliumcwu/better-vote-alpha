const mongoose = require('../config.js'),
      ObjectId = require('mongoose').Types.ObjectId;

const Election = require('../../models/Election.js'),
      Voter = require('../../models/Voter.js'),
      Admin = require('../../models/Admin.js');

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

//Create a new election on form submission
function createElection(electionData, res) {
  const admin = electionData.admin;
  const electionTitle = electionData.electionTitle;
  const candidates = electionData.candidates;
  const voters = electionData.voters;
  //assemble election for mongoose
  const newElection = new Election({
    electionTitle: electionTitle,
    admin: mongoose.Types.ObjectId(admin._id),
    candidates: candidates,
    ballots: []
  })

  //save newElection, get back id of election

  var ballotStorage = [];
  for (let i = 0; i < voters.length; i++) {
    const voter = new Voter({
      fName: voters[i].fName,
      email: voters[i].email
    });
    voter.save();
    ballotStorage.push({
      voter: voter,
      votes: candidates
    })
  }
  console.log(ballotStorage);
  newElection.ballots = ballotStorage;
  newElection.save( err => {
    if (!err) {
      Election.find({})
      .populate('admin')
      .populate('ballots.voter')
      .exec( (err, elections) => {
        console.log(JSON.stringify(elections, null, 2));
      })
    }
  })
}

module.exports = {
  findAllElection,
  findElectionById,
  findBallotById,
  createElection
}
