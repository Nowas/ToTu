var express = require('express');
var router = express.Router();
var vehicleRoute = require('./../lib/vehicleRoute');


router.get('/', function(req, res){
    vehicleRoute.getVehicleRoute(
        req.query.runId,
        function(polylinePoint){
            res.jsonp(polylinePoint);    
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
        callback(vehicleRoute.getVehiclesRoute());
    });
    socket.on("putRoute", function(data, callback) {
        callback({success:false});
    });
}

module.exports.router = router;
