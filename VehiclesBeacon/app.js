var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    vehicles = require('./lib/vehicles');
    
module.exports = app;

app.use(bodyParser.json());

var sendReplay = function(err,resp, result){
};

app.get('/vehicles', function(req, res){
    res.send({success:true, vehicles: vehicles.getVehicles()});    
});

app.post('/vehicles', function(req, res){
    var vehicle = req.body;
    var status = vehicles.addVehicle( vehicle);
    res.send({success:status});    
});

app.delete('/vehicles', function(req, res){
    var id = req.body.id;
    var status = vehicles.deleteVehicle( id);
    res.send({success:status});    
});