var express = require('express');
var beaconerConf = require('../lib/configuration');
var collectDataTool = require('../lib/collectDataTool');
var router = express.Router();

/* GET home page. */
router.get('/vehicles', function(req, res, next) {
    var beacons = beaconerConf.getConfig();
    collectDataTool.getVehiclesDataFromVehicleBeaconsSocket(beacons, function(vehicles){
       res.jsonp(vehicles);
    });          
});

module.exports = router;