var express = require('express');
var router = express.Router();
var vehicles = require('./../lib/vehicles');


router.get('/', function(req, res){
    res.json({success:true, data: vehicles.getVehicles()});    
});

router.post('/', function(req, res){
    var status = vehicles.addVehicle( req.body);
    res.json({success:status});    
});

router.delete('/', function(req, res){
    var id = req.body.id;
    var status = vehicles.deleteVehicle( id);
    res.json({success:status});    
});


module.exports.initSocket = function(socket){ 
    socket.on("getVehicles", function(data, callback) {
        callback({success:true, data: vehicles.getVehicles()});
    });
    socket.on("putVehicle", function(data, callback) {
        callback({success:vehicles.addVehicle(data)});
    });
}

module.exports.router = router;
