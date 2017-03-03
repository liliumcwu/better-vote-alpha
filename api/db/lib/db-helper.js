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
  Election.find(query)
  .populate('admin')
  .populate('ballots.voter')
  .exec( (err, ballot) => {
    if (err) throw (err);
    if (ballot[0]) {
      // get correct ballot of particular voter
      let specificBallot = {};
      for (let i = 0; i < ballot[0].ballots.length; i++) {
        console.log(ballotId)
        console.log(ballot[0].ballots[i]._id)
        if (ballotId == ballot[0].ballots[i]._id) {
          console.log('found match')
          specificBallot.ballot = ballot[0].ballots[i];
        }
      }
      specificBallot.electionTitle = ballot[0].electionTitle;
      specificBallot.admin = ballot[0].admin[0].displayName;
      // res.json({ballot: specificBallot });
      console.log(specificBallot)
      res.render('ballots', {data: specificBallot})
          // res.json({ballot: ballot[0]});

    }
    else {
      res.json({status: 404})
    }
  })
}

function findBallotById2(electionId, ballotId, res) {
  // const query = { campaign_id: new ObjectId(campaign._id) };
  const query = {'ballots._id': ObjectId(ballotId)}
  Election.find(query)
  .populate('admin')
  .populate('ballots.voter')
  .exec( (err, ballot) => {
    if (err) throw (err);
    if (ballot[0]) {
      // get correct ballot of particular voter
      let specificBallot = {};
      for (let i = 0; i < ballot[0].ballots.length; i++) {
        console.log(ballotId)
        console.log(ballot[0].ballots[i]._id)
        if (ballotId == ballot[0].ballots[i]._id) {
          console.log('found match')
          specificBallot.ballot = ballot[0].ballots[i];
        }
      }
      specificBallot.electionTitle = ballot[0].electionTitle;
      specificBallot.admin = ballot[0].admin[0].displayName;
      // res.json({ballot: specificBallot });
      console.log(specificBallot)
      res.json({data: specificBallot})
          // res.json({ballot: ballot[0]});

    }
    else {
      res.json({status: 404})
    }
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
        res.json({status: 200});
      })
    }
  })
}

// function updateBallot(electionId, ballotId, rankedVotes, res) {
//   console.log(rankedVotes);
//   Election.findOneAndUpdate({
//     'ballots._id': ObjectId(ballotId)
//   },
//   {$set: {hasVoted: true} },
//   {new: true}, (err, doc) => {
//     if (err) {
//       console.log('Something wrong with updating candidate votes')
//     }
//     console.log(doc)
//     res.send(doc);
//   })
//   // res.send(rankedVotes);
// }

function updateBallot(electionId, ballotId, rankedVotes, res) {
  console.log(rankedVotes);
  //Find specific election
  Election.find({_id: ObjectId(electionId)}, (err, doc) => {
    console.log(doc);
    //Find embedded doc by Id
    var ballot = doc[0].ballots.id(ballotId)
    ballot.hasVoted = true;
    ballot.votes = rankedVotes;
    console.log(ballot)
    doc[0].save( err => {
      if (err) throw (err)
        else {
          res.json({status: 200})
        }
    });
    // res.send(ballot);
  })
  // console.log(doc)
  // res.send(rankedVotes);
}

module.exports = {
  findAllElection,
  findElectionById,
  findBallotById,
  findBallotById2,
  createElection,
  updateBallot
}
