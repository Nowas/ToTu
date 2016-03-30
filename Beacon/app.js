var bodyParser = require('body-parser'),
    vehicleStops = require('./lib/vehicleStops'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    vehicles = require('./routes/vehicle'),
    vehicleStops = require('./routes/vehicleStop');
    
module.exports = server;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var router = express.Router();              // get an instance of the express Router
 app.use('/vehicles', vehicles.router);
 app.use('/vehicleStops', vehicleStops.router);



io.on('connection', function(socket)
{
    console.log('Client connected.');

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });    
    vehicles.initSocket(socket);
    vehicleStops.initSocket(socket);
});