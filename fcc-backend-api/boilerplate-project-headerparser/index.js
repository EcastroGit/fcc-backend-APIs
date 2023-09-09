// init project
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Header parser microservice
app.get("/api/whoami", function(req, res) {
  const ip = req.ip;
  const languaje = req.headers["accept-language"];
  const software = req.headers["user-agent"];
  res.json({
    ipaddress: ip,
    language: languaje,
    software: software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
