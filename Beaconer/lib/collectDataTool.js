var request = require('request');

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
    return {
        getVehiclesDataFromVehicleBeacons:getVehiclesDataFromVehicleBeacons
    }
};

module.exports = DataTool();

