const express = require('express');
const OAuth2Server = require('oauth2-server');
const model = require('../models/model');

const router = express.Router();
const oauth = new OAuth2Server({ model });

router.get('/authorize', (req, res) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  oauth.authorize(request, response, {
    authenticateHandler: {
      handle: () => ({ id: 1, username: 'user' }) // Dummy user
    }
  }).then(code => res.json(code))
    .catch(err => res.status(err.code || 500).json(err));
});

module.exports = router;