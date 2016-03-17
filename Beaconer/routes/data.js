var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/vehicles', function(req, res, next) {
    // here should be logic for request for all vehiclebeacons
var vehs =[{ID:'1', lineID:1, displayText:'12', lat:52.25, lng:21.00},
           {ID:'2', lineID:1, displayText:'13', lat:52.25, lng:21.01}];

  res.jsonp( vehs);
});

module.exports = router;