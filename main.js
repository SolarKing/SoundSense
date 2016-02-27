//// main.js ////
// import dependencies
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
// allows us to read data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));
// allows us to use this url from another domain/origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// create an instance of the router
var router = express.Router();

var storage = 0;

// define a route
router.route("/api/v1/soundsense")
// handle GET request
.get(function(req, res) {
  // respond w/ json
  console.log("[GET]");
  res.json({
    data: storage
  });
  console.log(storage);
})
.post(function(req, res) {
  storage = 0;
  // get the data from the POST request
  var data = req.body;
  var counter = 0;

  var someData = req.body.toString().slice(3, -3);
  console.log(someData);
  var someData2 = someData;
  // respond w/ json
  console.log(someData2);
  if (someData2.values) {
    someData2.values.forEach(function(value) {
      if(value.value) {
        counter++;
        storage += value.value;
      }
    });
  }
  if (storage > 0) {
    storage = storage / counter;
  } else {
    storage = 0;
  }
  console.log("[POST]");
  res.json({
    data: storage
  });
  console.log(storage);
});

router.route("/*")
  .get(function(req, res) {
    var options = {
      root: __dirname + "/dist/"
    };

    res.sendFile("index.html", options, function(err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        console.log("Served Web App!!!");
      }
    });
  });

// define the namespace of the router
app.use('/', router);
// use the port defined by the environment, defaults to port 3000
var port = process.env.PORT || 3000;
// start the server
var server = app.listen(port, function() {
  console.log("Magic is happening on port %s...", server.address().port);
});
