var bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    vehicleRoute = require('./routes/vehicleRoute');
    
module.exports = server;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var router = express.Router();              // get an instance of the express Router
 app.use('/vehicleRoute', vehicleRoute.router);

 

io.on('connection', function(socket)
{
    console.log('Client connected.');

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });    
    vehicleRoute.initSocket(socket);
});