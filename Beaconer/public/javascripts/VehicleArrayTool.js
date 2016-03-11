(function(exports){

    function VehicleArrayTool(){
        var prevVehicles = [];
        var removedVehicles = [];
        var addedVehicles = [];
        var modifiedVehicles = [];
        
        function newData(newVehicles){
            newVehicles = newVehicles.sort(sortVehicleFn);
            removedVehicles.splice(0,removedVehicles.length);
            modifiedVehicles.splice(0,modifiedVehicles.length);
            addedVehicles.splice(0,addedVehicles.length);

            var prevIt=0, newIt=0;

            while( prevIt < prevVehicles.length || newIt < newVehicles.length )
            {
                if (prevVehicles[prevIt] < newVehicles[newIt] ||
                        newIt == newVehicles.length){
                    removedVehicles.push(prevVehicles[prevIt]);
                    prevIt++;
                }
                else if (prevVehicles[prevIt] > newVehicles[newIt] ||
                        prevIt == prevVehicles.length){ 
                    addedVehicles.push(newVehicles[newIt]);
                    newIt++;
                }
                else
                {
                    modifiedVehicles.push(prevVehicles[prevIt]);
                    prevIt++;
                    newIt++;
                }
            }
            prevVehicles = newVehicles;
        }
        
        function sortVehicleFn(a, b){
            return a.ID.localeCompare(b.ID);
        }
        
        return {
            newData:newData,
            removedVehicles:removedVehicles,
            modifiedVehicles:modifiedVehicles,
            addedVehicles:addedVehicles
        }
    };
    exports.VehicleArrayTool = VehicleArrayTool;

})(typeof exports === 'undefined'? this['VehicleArrayTool']={}: exports);
