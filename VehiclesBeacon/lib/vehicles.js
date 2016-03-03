var vehicles = {};

exports.getVehicles = function(callback){
    callback(null, vehicles);
}

exports.addVehicle = function(vehicle, callback){
    vehicles[vehicle.id] = vehicle;
    callback(null);
}

exports.deleteVehicle = function(id, callback){
    delete vehicles[id];
    callback(null);
}