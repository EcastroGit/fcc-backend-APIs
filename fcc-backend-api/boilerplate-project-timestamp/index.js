// Init project
const express = require('express');
const app = express();
const cors = require('cors');


// Middlewares
app.use(cors({ optionsSuccessStatus: 200 })); // Cors for allowing testing
app.use(express.static('public'));

// Index.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// First API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Dates API
app.get("/api/:date?", function(req, res) {
  const dateParam = req.params.date;

  if (!dateParam) {
    // Current date when a param does not exists 
    const currentDate = new Date();
    const formattedDate = currentDate.toUTCString();

    res.json({
      unix: currentDate.getTime(),
      utc: formattedDate
    });
  } else {
    let parsedDate;
    if (/^\d+$/.test(dateParam)) {
      // Date in UNIX format
      parsedDate = new Date(parseInt(dateParam));
    } else {
      // process de param in date string
      parsedDate = new Date(dateParam);
    }

    // Verify the correct format for date param
    if (isNaN(parsedDate)) {
      res.json({ error: "Invalid Date" });
    } else {
      const formattedDate = parsedDate.toUTCString();

      res.json({
        unix: parsedDate.getTime(),
        utc: formattedDate
      });
    }
  }
});


// Listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
