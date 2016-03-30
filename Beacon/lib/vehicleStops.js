var vehicleStops = {};

exports.getVehicleStops = function(){
    var res = [];
    for (var prop in vehicleStops) { 
        res.push( vehicleStops[prop]);
    }
    return res;
}

exports.addVehicleStop = function(vehicleStop){
    if( vehicleStop.id == null ||
        vehicleStop.lat == null || vehicleStop.lng == null)
        return false;
        
    vehicleStops[vehicleStop.id] = vehicleStop;
    return true;
}

exports.addVehicleStops = function(vehicleStopsInput){
    console.log(vehicleStopsInput);
    vehicleStopsInput.forEach(function(entry) {
        exports.addVehicleStop(entry);
    });
    return true;
}


exports.deleteVehicleStop = function(id){
    if( vehicleStops[id] == null)
        return false;
        
    delete vehicleStops[id];
    return true;
}

exports.clearVehicleStop = function(){
    for (var prop in vehicleStops) { 
        delete vehicleStops[prop];
    }
}