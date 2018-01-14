import http from 'http'
import socketIO from 'socket.io'
import {System as SystemConfig} from './config';

const server = http.createServer();

const io = socketIO(server, {
  path: '/echo-protocol',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  transports: ['websocket','polling']// 'polling',
});


io.of('/echo-protocol').on('connection', function (socket) {
  console.log('connection => ' + socket.id);
  socket.on('message', function (data) {
    socket.broadcast.emit('message', data);
    console.log('message' + data);
  });
  socket.on('error', (error) => {
    console.log(error);
  });
  socket.on('disconnect', function (reason) {
    console.log('disconnect' + reason);
  });
});

server.listen(SystemConfig.CHAT_server_port);
console.log('Now start Chat server on port ' + SystemConfig.CHAT_server_port + '...');
