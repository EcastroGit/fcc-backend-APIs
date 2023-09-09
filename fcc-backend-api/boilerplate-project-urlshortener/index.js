// Definitions
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const { savedUrls } = require("./urls-bd.js");
let shortUrl = 1;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

// Routes
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// URL shortener microservice
app.post("/api/shorturl", function(req, res) {
  const originalUrl = req.body.url;
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
  if (urlRegex.test(originalUrl)) {
    savedUrls.push({
      original_url: originalUrl,
      short_url: shortUrl
    });
    console.log(savedUrls);
    res.send({
      original_url: originalUrl,
      short_url: shortUrl
    });
    shortUrl++;
  } else {
    res.send({ error: 'invalid url' });
  }
});

app.get("/api/shorturl/:shorturl", function(req, res) {
  const shortUrl = req.params.shorturl;
  const findUrl = savedUrls.find(url => url.short_url === parseInt(shortUrl));
  if (findUrl) {
    res.redirect(findUrl.original_url);
  } else {
    res.send({ error: 'invalid url' });
  }
});


// Server listening
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
