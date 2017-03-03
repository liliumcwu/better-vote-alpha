const express = require('express'),
      router = express.Router();

const dbHelper = require('../db/lib/db-helper.js');

//Find specific ballot with specific voter from database and display candidates
router.get('/:electionId/:ballotId', (req, res, next) => {
  let electionId = req.params.electionId;
  let ballotId = req.params.ballotId;
  dbHelper.findBallotById(electionId, ballotId, res);
})

//REFACTOR TO PUT LATER WITH METHOD OVERRIDE OR LONGFORM AJAX
router.post('/:electionId/:ballotId', (req, res, next) => {
  let rankedVotes = req.body.rankedVotes;
  let electionId = req.params.electionId;
  let ballotId = req.params.ballotId;
  dbHelper.updateBallot(electionId, ballotId, rankedVotes, res);
})

module.exports = router;
