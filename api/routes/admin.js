const express = require('express'),
      router = express.Router();

const mongoose = require('../db/config.js');

const Admin = require('../models/Admin.js');

//find all admins
router.get('/', (req, res, next) => {
  Admin.find({})
  .exec( (err, admins) => {
    if (err) throw (err);
    res.json({admins})
  })
})


module.exports = router;
