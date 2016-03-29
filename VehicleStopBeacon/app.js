var bodyParser = require('body-parser'),
    vehiclesStops = require('./lib/vehiclesStops'),
    app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server);
    
module.exports = server;

app.use(bodyParser.json());

io.on('connection', function(socket)
{
    console.log('Client connected.');

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });    
    socket.on("getVehiclesStops", function(data, callback) {
        callback({
            success:true, 
            data: vehiclesStops.getVehiclesStops(
                data.fromLng,
                data.fromLat,
                data.toLng,
                data.toLat
            )});
    });
});

var sendReplay = function(err,resp, result){
};

app.get('/vehiclesStops', function(req, res){
    res.json({success:true, data: vehiclesStops.getVehiclesStops(0,60,60,0)});    
});
