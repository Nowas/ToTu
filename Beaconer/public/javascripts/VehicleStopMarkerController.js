function VehicleStopMarkerController(dataUrl, dataRefresheInterval) {
    var propTool = new MarkerArrayTool();
    var params = {markerType:'VehicleStop', visible : true};
    var markerController = new MarkerController(
        dataUrl, 
        dataRefresheInterval, 
        prepareVehicleStopMarkers,
        params); 

    function prepareVehicleStopMarkers(prevMarkers, newMarkers, params )
    {
        var prepMarkers = propTool
            .withNewData(newMarkers)
            .withColor('purple')
            .withSize(23)
            .withVisibility(params.visible)
            .withType(params.markerType)
            .withAvailability(prevMarkers)
            .build();
            
        ToTuEventGenerator('NewMarkersData', prepMarkers);
    }
    function zoomChanged(zoom){
        if(zoom > 14)
            params.visible = true;
        else
            params.visible = false;
        markerController.setCallbackParams(params);
    }
    
    return{
        setNewVisibleCoords : markerController.setNewVisibleCoords,
        zoomChanged: zoomChanged,
    }
}