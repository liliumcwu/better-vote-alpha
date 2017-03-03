const express = require('express'),
      router = express.Router();

// const mongoose = require('../db/config.js'),
//       ObjectId = require('mongoose').Types.ObjectId;

const dbHelper = require('../db/lib/db-helper.js');

//Find specific ballot with specific voter from database and display candidates
router.get('/:electionId/:ballotId', (req, res, next) => {
  console.log(req.params.electionId);
  console.log(req.params.ballotId);
  let electionId = req.params.electionId;
  let ballotId = req.params.ballotId;
  dbHelper.findBallotById(electionId, ballotId, res);
  // res.render('ballots');
})

module.exports = router;
