var request = require('request');
var io = require('socket.io-client');

var beacons = [];
var search = [];
var config = {};

var resUrl = 'http://localhost:5000/configuration';

var Configurations = function(){
    function loadConfigSocket(){
        var socket = io.connect(resUrl, {reconnect: true});            
        socket.on('connect', function(socket) {
            console.log('Connected!');
        });
        socket.emit("getFulllConfig",null, function(res){
            socket.disconnect();
            beacons = res.data.beacons;
        });
    };
    
    function loadConfig(){
        request(resUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                config = JSON.parse(body).data;
            }
        })
    };
    loadConfig();
    function getBeacons()
    {
        return config.beacons;
    }
    
    function getSearch()
    {
        return config.search;
    }
    function getStopInfo()
    {
        return config.stopInfo;
    }
    function getRouteInfo()
    {
        return config.routeInfo;
    }

    return {
        getBeacons:getBeacons,
        getSearch:getSearch,
        getRouteInfo:getRouteInfo,
        getStopInfo:getStopInfo
        
    }
}

module.exports = Configurations();