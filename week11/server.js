const express = require('express');
const bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');
const cors = require('cors');
const http = require('http');
const router = require('./routes/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://local.test.com" }));
app.use('/oauth', router);


const HTTP_PORT = 3000
http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`OAUTH HTTP Server started on:${HTTP_PORT}`);
});