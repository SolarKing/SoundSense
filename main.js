var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allows us to use this url from another domain/origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// create an instance of the router
var router = express.Router();


// require('./routes/soundsense.js')(router);

// define the namespace of the router
app.use('/', router);
// use the port defined by the environment, defaults to port 3000
var port = process.env.PORT || 3000;
// start the server

// handle socket events
io.on('connection', function (socket) {
  socket.on('soundsensedata', function (data) {
    socket.emit('toClient', { data: data });
  });
});

server.listen(port, function() {
  console.log("Magic is happening on port %s...", server.address().port);
});
