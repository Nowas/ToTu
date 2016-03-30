var vehicleStops = require('./../lib/vehicleStops');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.json({success:true, data: vehicleStops.getVehicleStops()});    
});

router.post('/', function(req, res){
    var status = vehicleStops.addVehicleStops(req.body);
    res.json({success:status});    
});

router.delete('/', function(req, res){
    var id = req.body.id;
    var status = vehicleStops.deleteVehicleStop( id);
    res.json({success:status});    
});

module.exports.initSocket = function(socket){ 
    socket.on("getVehicleStops", function(data, callback) {
        callback({success:true, data: vehicleStops.getVehicleStops(data)});
    });
    socket.on("putVehicleStops", function(data, callback) {
        callback({success:vehicleStops.addVehicleStops(data)});
    });
}

module.exports.router = router;