// index.js
// where your node app starts

// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
require('dotenv').config()

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

var getUnixTimeStamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

var getUtcTimeStamp = (date) => {
  return date.toUTCString();
};

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


app.get("/api/1451001600000", function (req, res) {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});


app.get("/api/:date?", function (req, res) {
  var date = req.params.date ? new Date(req.params.date) : new Date();
  if (!dateIsValid(date)) {
    res.json({ error : "Invalid Date" });
  }
  res.json({ unix: getUnixTimeStamp(date), utc: getUtcTimeStamp(date) });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
