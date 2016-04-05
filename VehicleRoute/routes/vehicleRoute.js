var express = require('express');
var router = express.Router();
var vehicleRoute = require('./../lib/vehicleRoute');


router.get('/', function(req, res){
    vehicleRoute.getVehicleRoute(
        req.query.id,
        function(data){
            res.json({success:true, data: data});    
        });    
});

router.post('/', function(req, res){
    res.json({success:false});    
});

router.delete('/', function(req, res){
    var id = req.body.id;
    res.json({success:false});    
});


module.exports.initSocket = function(socket){ 
    socket.on("getRoute", function(data, callback) {
        callback({success:true, data: vehicleRoute.getVehicles()});
    });
    socket.on("putRoute", function(data, callback) {
        callback({success:false});
    });
}

module.exports.router = router;
