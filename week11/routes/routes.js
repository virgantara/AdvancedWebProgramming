const express = require('express');
const OAuth2Server = require('oauth2-server');
const model = require('../models/model');

const router = express.Router();
const oauth = new OAuth2Server({ model });

router.get('/authorize', (req, res) => {

  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);
  try{

    oauth.authorize(request, response, {
      authenticateHandler: {
        handle: (req) => {
          return {id : req.query.user_id}
        }

      }
    }).then(code => {
      res.json(code)
    })
    .catch(err => {
      console.error(err)
      res.status(err.code || 500).json(err)
    });
  }
  catch(error){
    console.error(error)
    res.status(500).json("Something is wrong")
  }
});


router.post('/token', (req, res) => {
  try{


    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);
    
    oauth.token(request, response)
        .then((token) => {
          
          res.json(token);
            
            
        })
        .catch((err) => {
            console.error('Error issuing token:', err);
            res.status(err.code || 500).json({ error: err });
        });
  }
  catch(error){
    console.error(error)
  }
});

// router.post('/token', async (req, res) => {

//   const request = new OAuth2Server.Request(req);
//   const response = new OAuth2Server.Response(res);

//   try {
//     const token = await oauth.token(request, response);
//     res.json(token);
//   } catch (err) {
//     console.error(err);
//     res.status(err.code || 500).json({ error: err.message });
//   }
// });

module.exports = router;