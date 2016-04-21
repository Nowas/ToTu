var express = require('express');
var router = express.Router();
var vehicleRoute = require('./../lib/vehicleRunRoute');


router.get('/', function(req, res){
    vehicleRoute.getVehicleRunRoute(
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
    socket.on("getRunRoute", function(data, callback) {
        callback(vehicleRoute.getVehiclesRoute());
    });
    socket.on("putRunRoute", function(data, callback) {
        callback({success:false});
    });
}

module.exports.router = router;
