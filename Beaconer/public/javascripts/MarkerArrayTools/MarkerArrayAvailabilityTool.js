var  MarkerArrayAvailabilityTool = function(){
        var prevMarkers = [];
        var removedMarkers = [];
        var addedMarkers = [];
        var modifiedMarkers = [];
        
        function newData(newVehicles){
            newVehicles = newVehicles.sort(sortVehicleFn);
            removedMarkers.splice(0,removedMarkers.length);
            modifiedMarkers.splice(0,modifiedMarkers.length);
            addedMarkers.splice(0,addedMarkers.length);

            var prevIt=0, newIt=0;

            while( prevIt < prevMarkers.length || newIt < newVehicles.length )
            {
                if (prevMarkers[prevIt] < newVehicles[newIt] ||
                        newIt == newVehicles.length){
                    removedMarkers.push(prevMarkers[prevIt]);
                    prevIt++;
                }
                else if (prevMarkers[prevIt] > newVehicles[newIt] ||
                        prevIt == prevMarkers.length){ 
                    addedMarkers.push(newVehicles[newIt]);
                    newIt++;
                }
                else
                {
                    modifiedMarkers.push(prevMarkers[prevIt]);
                    prevIt++;
                    newIt++;
                }
            }
            prevMarkers = newVehicles;
        }
        
        function sortVehicleFn(a, b){
            return a.ID.localeCompare(b.ID);
        }
        
        function getRemovedMarkers(){
            return removedMarkers;
        }

        function getAddedMarkers(){
            return addedMarkers;
        }

        function getModifiedMarkers(){
            return modifiedMarkers;
        }

        return {
            newData:newData,
            getRemovedMarkers:getRemovedMarkers,
            getModifiedMarkers:getModifiedMarkers,
            getAddedMarkers:getAddedMarkers
        }
    };

if (typeof module !== "undefined" && module.exports) {
    module.exports = MarkerArrayAvailabilityTool;
}