var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    vehicles = require('./lib/vehicles');
    
module.exports = app;

app.use(bodyParser.json());

app.get('/vehicles', function(req, res){
    vehicles.getVehicles( function(err, result){
        if(err){
            return res.status(500).json({success:false, reason: err.message})
        }
        res.send({success:true, vehicles: result});
    })
});