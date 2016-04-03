function VehicleMarkerController(dataUrl, dataRefresheInterval) {
    var availabilityTool = new MarkerArrayAvailabilityTool();
    var visibilityTool = new MarkerArrayVisibilityTool();
    var setTypeTool = new MarkerArraySetTypeTool();
    var params = {markerType:'Vehicle', selectedDisplayText:null};
    var markerController = new MarkerController(
        dataUrl, 
        dataRefresheInterval, 
        prepareVehicleMarkers,
        params); 

    function prepareVehicleMarkers(prevMarkers, newMarkers, params)
    {
        var availabilityTool = new MarkerArrayAvailabilityTool();
        var visibilityTool = new MarkerArrayVisibilityTool();
        var setTypeTool = new MarkerArraySetTypeTool();
        var prepMarkers = setTypeTool.run(
                params.markerType,
                visibilityTool.vehicle(
                    'yellow',
                    23,
                    params.selectedDisplayText, 
                    availabilityTool.run(prevMarkers, newMarkers)));
        ToTuEventGenerator('NewMarkersData', prepMarkers);
    }
    
    function setSelectedDisplayText(text) {
        params.selectedDisplayText = text;
        markerController.setCallbackParams(params);
    }

    return {
        setSelectedDisplayText: setSelectedDisplayText,
        setNewVisibleCoords : markerController.setNewVisibleCoords,
    }
}