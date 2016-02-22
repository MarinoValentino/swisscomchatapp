var app = require('express')();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendfile("./public/index.html")
})

app.get('/css/style.css', function (req, res) {
  res.sendfile("./public/css/style.css")
})

app.get('/js/index.js', function (req, res) {
  res.sendfile("./public/js/index.js")
})

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
  console.log('Express server listening on *:3000');
});

var connected;
var sockets;
var userOnline = 0;
io.on('connection', function (socket) {


  connected = io.sockets.connected;
  sockets = io.sockets.sockets;
  console.log(connected)
  console.log(connected.length)
  console.log(sockets)
  console.log(sockets.length)


  console.log('a user connected');



  socket.emit('user connected', userOnline);

  socket.on('chat message', function(msg){
    io.broadcast.emit('chat message', msg);
    //socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
    socket.broadcast.emit('user disconnected', userOnline);
  });
});
