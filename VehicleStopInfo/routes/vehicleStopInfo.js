var express = require('express');
var router = express.Router();
var vehicleStopInfo = require('./../lib/vehicleStopInfo');


router.get('/', function(req, res){
    vehicleStopInfo.getVehicleStopInfo(
        req.query.stopId,
        function(stopInfo){
            res.jsonp(stopInfo);    
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
    socket.on("getStopInfo", function(data, callback) {
        callback(vehicleRoute.getVehiclesRoute());
    });
    socket.on("putStopInfo", function(data, callback) {
        callback({success:false});
    });
}

module.exports.router = router;
