var express = require('express');
var router = express.Router();
var configuration = require('./../lib/configuration');


router.get('/', function(req, res){
    res.json({success:true, data: configuration.getFullConfig()});    
});



module.exports.initSocket = function(socket){ 
    socket.on("getFullConfiguration", function(data, callback) {
        callback({success:true, data: configuration.getFullConfig()});
    });
}

module.exports.router = router;
