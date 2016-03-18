var express = require('express');
var request = require('request');
var beaconerConf = require('../configuration');
var router = express.Router();

/* GET home page. */
router.get('/vehicles', function(req, res, next) {
    var responses = [];
    var completed_request = 0;
    var beacons = beaconerConf.getConfig();
    beacons.forEach(function(confEntry){
        request(confEntry.url, function (error, response, body) {
            completed_request++;
            if (!error && response.statusCode == 200) {
                responses.push(JSON.parse(body).data);
                if (completed_request == beacons.length) {
                    var merged = [].concat.apply([], responses)
                    res.jsonp(merged);
                }
            }
        })
    });
});

module.exports = router;