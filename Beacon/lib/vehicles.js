var vehicles = {};
    
exports.getVehicles = function(){
    var res = [];
    for (var prop in vehicles) { 
        res.push( vehicles[prop]);
    }
    return res;
}

exports.addVehicle = function(vehicle){
    if( vehicle.id == null ||
        vehicle.lat == null || vehicle.lng == null)
        return false;
        
    vehicles[vehicle.id] = vehicle;
    return true;
}

exports.deleteVehicle = function(id){
    if( vehicles[id] == null)
        return false;
        
    delete vehicles[id];
    return true;
}

exports.clearVehicle = function(){
    for (var prop in vehicles) { 
        delete vehicles[prop];
    }
}