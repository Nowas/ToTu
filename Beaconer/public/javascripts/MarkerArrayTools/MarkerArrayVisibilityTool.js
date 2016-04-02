if (typeof module !== "undefined" && module.exports) {
    var SimplePropSettings = require('./SimplePropSettings');
}

var  MarkerArrayVisibilityTool = function(){
        var sps = new SimplePropSettings(); 
        function vehicle(color, size, selectedDisplayText, markers){
            if( !markers )
                return [];
            markers.forEach(function(entry){
                entry = sps.vehicleVisibility(
                            selectedDisplayText,
                            sps.colorAndSize(
                                color,
                                size,
                                sps.type(
                                    'Vehicle',
                                    entry))); 
            });
            return markers;
        }
        
        function vehicleStop(color, size, markers){
            if( !markers )
                return [];
            markers.forEach(function(entry){
                entry = sps.visibility(
                            true,
                            sps.colorAndSize(
                                color,
                                size,
                                sps.type(
                                    'VehicleStop',
                                    entry))); 
            });
            return markers;
        }

        return {
            vehicle:vehicle,
            vehicleStop:vehicleStop,
        }
    };
        
if (typeof module !== "undefined" && module.exports) {
    module.exports = MarkerArrayVisibilityTool;
}