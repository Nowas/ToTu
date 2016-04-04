function VehicleMarkerController(dataUrl, dataRefresheInterval) {
    var propTool = new MarkerArrayTool();
    var params = {markerType:'Vehicle', selectedDisplayText:null};
    var markerController = new MarkerController(
        dataUrl, 
        dataRefresheInterval, 
        prepareVehicleMarkers,
        params); 

    function prepareVehicleMarkers(prevMarkers, newMarkers, params)
    {
        var prepMarkers = propTool
            .withNewData(newMarkers)
            .withColor('yellow')
            .withSize(23)
            .withSelectedDataText(params.selectedDisplayText)
            .withType(params.markerType)
            .withAvailability(prevMarkers)
            .withVisibility(true)
            .build();
            
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