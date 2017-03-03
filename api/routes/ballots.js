const express = require('express'),
      router = express.Router();

const mongoose = require('../db/config.js'),
      ObjectId = require('mongoose').Types.ObjectId;

router.get('/:electionId/:ballotId', (req, res, next) => {
  console.log(req.params.electionId);
  console.log(req.params.ballotId);
  res.send('found it')
})

module.exports = router;
