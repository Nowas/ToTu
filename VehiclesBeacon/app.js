var bodyParser = require('body-parser'),
    vehicles = require('./lib/vehicles'),
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
    socket.on("getVehicles", function(data, callback) {
        callback({success:true, data: vehicles.getVehicles()});
    });
    
});

var sendReplay = function(err,resp, result){
};

app.get('/vehicles', function(req, res){
    res.json({success:true, data: vehicles.getVehicles()});    
});

app.post('/vehicles', function(req, res){
    var vehicle = req.body;
    var status = vehicles.addVehicle( vehicle);
    res.json({success:status});    
});

app.delete('/vehicles', function(req, res){
    var id = req.body.id;
    var status = vehicles.deleteVehicle( id);
    res.json({success:status});    
});
