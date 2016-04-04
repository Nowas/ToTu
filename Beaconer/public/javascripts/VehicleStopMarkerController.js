function VehicleStopMarkerController(dataUrl, dataRefresheInterval) {
    var propTool = new MarkerArrayTool();
    var params = {markerType:'VehicleStop'};
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
            .withVisibility(true)
            .withType(params.markerType)
            .withAvailability(prevMarkers)
            .build();
            
        ToTuEventGenerator('NewMarkersData', prepMarkers);
    }
    return{
        setNewVisibleCoords : markerController.setNewVisibleCoords,
    }
}