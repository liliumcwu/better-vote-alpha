const express = require('express'),
      router = express.Router();

const dbHelper = require('../db/lib/db-helper.js');

//GET all elections
router.get('/', (req, res, next) => {
  dbHelper.findAllElection(res);
})

//GET specific election
router.get('/:electionID', (req, res, next) => {
  let electionId = req.params.electionID;
  dbHelper.findElectionById(electionId, res);
})

//GET specific ballot in specific election
router.get('/:electionID/:ballotID', (req, res, next) => {
  let electionId = req.params.electionID;
  let ballotId = req.params.ballotID;
  dbHelper.findBallotById2(electionId, ballotId, res);
})

//POST create new election
router.post('/', (req, res, next) => {
  console.log(req.body);
  dbHelper.createElection(req.body, res);
})

//Refactor PUT update close election
router.post('/details/:electionID', (req, res, next) => {
  let electionId = req.params.electionID;
  console.log(electionId)
  dbHelper.closeElection(electionId, res);
})


module.exports = router;
