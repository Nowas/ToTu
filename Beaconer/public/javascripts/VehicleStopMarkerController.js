function VehicleStopMarkerController(dataUrl, dataRefresheInterval) {
    var availabilityTool = new MarkerArrayAvailabilityTool();
    var visibilityTool = new MarkerArrayVisibilityTool();
    var setTypeTool = new MarkerArraySetTypeTool();
    var params = {markerType:'VehicleStop'};
    var markerController = new MarkerController(
        dataUrl, 
        dataRefresheInterval, 
        prepareVehicleStopMarkers,
        params); 

    function prepareVehicleStopMarkers(prevMarkers, newMarkers, params )
    {
        var prepMarkers = setTypeTool.run(
                params.markerType,
                visibilityTool.vehicleStop(
                    'purple',
                    23,
                    availabilityTool.run(prevMarkers, newMarkers)));
        ToTuEventGenerator('NewMarkersData', prepMarkers);
    }
    return{
        setNewVisibleCoords : markerController.setNewVisibleCoords,
    }
}