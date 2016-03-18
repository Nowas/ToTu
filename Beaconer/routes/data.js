var express = require('express');
var request = require('request');
var router = express.Router();
var config = [{name:'vehBeacon1', url:'http://localhost:3000/vehicles'}];

/* GET home page. */
router.get('/vehicles', function(req, res, next) {
    request(config[0].url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.jsonp(JSON.parse(body).data);
        }
    })
});

module.exports = router;