const mongoose = require('./config.js');

const Election = require('../models/Election.js'),
      Voter = require('../models/Voter.js'),
      Admin = require('../models/Admin.js');


//First make users then election then ballot push

//Remove Election and Voter Collections

Voter.remove({}, err => {
  console.log('Voter collection removed')
});

Election.remove({}, err => {
  console.log('Election collection removed')
});

Admin.remove({}, err => {
  console.log('Admin collection removed')
});

//Admin Seed
const admin1 = new Admin({
  googleId: '111893810053247884920',
  displayName: 'Andrew Maidah',
  email: 'a.maidah@gmail.com'
})

admin1.save()
console.log(admin1)

//Voter Seed
const voter1 = new Voter({
  fName: 'Andrew',
  email: 'Andrew@andrew.com'
});

const voter2 = new Voter({
  fName: 'Tom',
  email: 'wu@wu.com'
});

const voter3 = new Voter({
  fName: 'Ritwik',
  email: 'Ritwik@Ritwik.com'
});

const voter4 = new Voter({
  fName: 'Sally',
  email: 'sally@sally.com'
});

const voter5 = new Voter({
  fName: 'Barrett',
  email: 'Barrett@Barrett.com'
});

const voter6 = new Voter({
  fName: 'Adam',
  email: 'adam@adam.com'
});

const voter7 = new Voter({
  fName: 'Tim',
  email: 'tim@tim.com'
});

const voter8 = new Voter({
  fName: 'Bao',
  email: 'bao@bao.com'
});

const voter9 = new Voter({
  fName: 'Annietest',
  email: 'An@an.com'
});

//Save Voter Seed
voter1.save();
voter2.save();
voter3.save();
voter4.save();
voter5.save();
voter6.save();
voter7.save();
voter8.save();
voter9.save();

//Election Seed
const election1 = new Election({
  electionTitle: 'Test Election',
  admin: [admin1],
  ballots: [],
  candidates: ['A', 'B', 'C']
});

//Ballot Seed
election1.ballots.push({
  voter: [voter1],
  votes: ['A', 'B', 'C']
})

election1.ballots.push({
  voter: [voter2],
  votes: ['B', 'C', 'A']
})

election1.ballots.push({
  voter: [voter3],
  votes: ['B', 'A', 'C']
})

election1.ballots.push({
  voter: [voter4],
  votes: ['A', 'C', 'B']
})

election1.ballots.push({
  voter: [voter5],
  votes: ['C', 'B', 'A']
})

election1.ballots.push({
  voter: [voter6],
  votes: ['C', 'A', 'B']
})

election1.ballots.push({
  voter: [voter7],
  votes: ['A', 'B', 'C']
})

election1.ballots.push({
  voter: [voter8],
  votes: ['A', 'C', 'B']
})

election1.ballots.push({
  voter: [voter9],
  votes: ['C', 'B', 'A']
})

// Save Election Seed
election1.save( err => {
  if (!err) {
    Election.find({})
    .populate('admin')
    .populate('ballots.voter')
    .exec( (err, elections) => {
      console.log(JSON.stringify(elections, null, 2));
      process.exit()
    })
  }
})

