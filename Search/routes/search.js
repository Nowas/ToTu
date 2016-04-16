var express = require('express');
var router = express.Router();
var search = require('./../lib/search');


router.get('/', function(req, res){
    search.getSearchResult(
        req.query.searchTerm,
        function(result){
            res.jsonp(result);    
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
    socket.on("getSearchResult", function(data, callback) {
        callback(vehicleRoute.getVehiclesRoute());
    });
    socket.on("putSearchResult", function(data, callback) {
        callback({success:false});
    });
}

module.exports.router = router;
