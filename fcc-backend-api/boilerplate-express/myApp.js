require('dotenv').config();
let express = require('express');
let app = express();
const bodyParser = require("body-parser");


// Middlewares
app.use("/public", express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  method = req.method;
  path = req.path;
  ip = req.ip;
  console.log(`${method} ${path} - ${ip}`);
  next();
})

// Routes
app.get("/", function(req, res) {
  const path = __dirname + '/views/index.html'
  res.sendFile(path);
})

app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() })
  } else {
    res.json({ message: "Hello json" })
  }
})

app.get("/now", 
(req, res, next) => {
  req.time = new Date().toString();
  next();
},        
(req, res) => {
  res.send({
    time: req.time
  });
}
);

app.get("/:word/echo", function(req, res) {
  const word = req.params.word;
  res.send({ echo: word });
})

app.get("/name", function(req, res) {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.send({ name: `${firstName} ${lastName}` });
})

app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});










































module.exports = app;
