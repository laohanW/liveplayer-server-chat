var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
  console.log((new Date()) + ' received request for ' + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(4000, function () {
  console.log((new Date()) + ' Server is listening on port 4000');
});

var wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', function (request) {
  console.log(request.origin);
  var connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection acepted.');
  connection.on('message', function (message) {
    console.log(message);
  });
  connection.on('close', function (resonCode, description) {
    console.log((new Date()) + 'Peer' + connection.remoteAddress + ' disconnected');
  });
});
