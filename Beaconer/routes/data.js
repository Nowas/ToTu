var express = require('express');
var beaconerConf = require('../lib/configuration');
var collectDataTool = require('../lib/collectDataTool');
var router = express.Router();

/* GET home page. */
router.get('/vehicles', function(req, res, next) {
    var beacons = beaconerConf.getBeacons();
    console.log(beacons);
    collectDataTool.getVehiclesDataFromBeaconsSocket(beacons, function(vehicles){
       res.jsonp(vehicles);
    });          
});

router.get('/vehicleStops', function(req, res, next) {
    var beacons = beaconerConf.getBeacons();
    collectDataTool.getVehicleStopsDataFromBeaconsSocket(beacons, function(vehicleStops){
       res.jsonp(vehicleStops);
    });          
});

module.exports = router;