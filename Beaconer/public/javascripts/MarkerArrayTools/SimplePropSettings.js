var  SimplePropSettings = function(){

        function vehicleVisibility(selectedDisplayText, marker){
            if( selectedDisplayText == null || marker.displayText == selectedDisplayText)
                marker.visible = true;
            else
                marker.visible = false;
            return marker;
        }
        
        function visibility(visible, marker){
            marker.visible = visible;
            return marker;
        }

        function colorAndSize(color, size, marker){
            marker.color = color;
            marker.size = size;
            return marker;
        }

        function type(type, marker){
            marker.type = type;
            return marker;
        }

        return {
            colorAndSize:colorAndSize,
            vehicleVisibility:vehicleVisibility,
            type:type,
            visibility:visibility,
        }
    };
        
if (typeof module !== "undefined" && module.exports) {
    module.exports = SimplePropSettings;
}