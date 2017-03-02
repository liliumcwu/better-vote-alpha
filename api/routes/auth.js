const express = require('express'),
      request = require('request'),
      router = express.Router();

require('../db/config');
const Admin = require('../models/Admin.js');

const googSecret = process.env.GOOGLE_CLIENT_SECRET;

router.post('/google', function(req, res) {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: googSecret,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  }

  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };
    // console.log(response);
    // const data = JSON.parse(token);
    console.log(token);

    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({message: profile.error.message});
      }
      if (profile) {
        console.log(profile);
        // req.session.profile = profile;
        Admin.find({
          googleId: profile.sub
        }, (err, data) => {
          if (err) throw (err);
          else if (!data[0]) {
            console.log(data[0]);
            const newAdmin = new Admin({
              googleId: profile.sub,
              displayName: profile.name,
              email: profile.email
            })
            newAdmin.save( err => {
              if (err) throw (err);
              else {
                console.log(`Unique user created: ${profile.name}`);
              }
            })
          }
          else if (data[0]) {
            console.log(`Unique Admin ${profile.name} already exists`);
          }
        // console.log(req.session.profile.sub);
        return res.send(profile)
        })
      }
    })
  })
})




module.exports = router;
