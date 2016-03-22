var request = require('request');
var io = require('socket.io-client');
  
  var DataTool = function(){
    function getVehiclesDataFromVehicleBeacons(beaconList, callback){
        var responses = [];
        var completed_request = 0;
        beaconList.forEach(function(beacon){
            request(beacon.url, function (error, response, body) {
                completed_request++;
                if (!error && response.statusCode == 200) {
                    responses.push(JSON.parse(body).data);
                    if (completed_request == beaconList.length) {
                        var merged = [].concat.apply([], responses)
                        callback(merged);
                    }
                }
            })
        });
    };
    function getVehiclesDataFromVehicleBeaconsSocket(beaconList, callback){
        var responses = [];
        var completed_request = 0;
        beaconList.forEach(function(beacon){
            var socket = io.connect(beacon.url, {reconnect: true});
            
            socket.on('connect', function(socket) {
                console.log('Connected!');
            });
            socket.emit("getVehicles",null, function(res){
                socket.disconnect();
                callback(res.data);
            });
        });
    };
    return {
        getVehiclesDataFromVehicleBeacons:getVehiclesDataFromVehicleBeacons,
        getVehiclesDataFromVehicleBeaconsSocket:getVehiclesDataFromVehicleBeaconsSocket
    }
};

module.exports = DataTool();

