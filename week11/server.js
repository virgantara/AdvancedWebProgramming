const express = require('express');
const bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');
const model = require('./models/model');

const router = require('./routes/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/oauth', router);

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});