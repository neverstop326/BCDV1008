var http = require('http'), 
url = require('url'), 
fs = require('fs'), 
io = require('socket.io'),
server;


(server = http.createServer(function(req, res){
  
  var path = url.parse(req.url).pathname;
  switch (path){
    case '/':
      fs.readFile(__dirname + '/index.html', function(err, data){
          if (err) return send404(res);
          res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'});
          res.write(data, 'utf8');
          res.end();
      });
      break;

    default: send404(res);
  }
})),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

server.listen(8080);

// socket.io, setup
var io = io.listen(server);

// setup socket listeners here

io.on("connection", function(socket) {
  console.log("Connection accepted.");

  socket.on("message", function(message) {
    console.log(`Recieved message: ${message} - from client`);
    socket.emit('msgreceived');
  });

  socket.on("disconnect", function() {
    console.log("Disconnected...");
  });

  socket.on('join', () => {
    console.log('joined private chat');
    socket.join('private');
    socket.emit('private-welcome', 'Welcome to Private Chat');
    io.to('private').emit(
      'private-welcome',
      'user has joined the private chat'
    );
  });

  socket.on('leave', () => {
    console.log('left private chat');
    socket.leave('private');
    io.to('private').emit('private-exit', 'user has joined the private chat');
  });

  socket.on('private-send', function(message) {
    console.log(`Recieved message: ${message} - from client`);
    io.to('private').emit('private-msg-sent', 'private message sent');
  });
});