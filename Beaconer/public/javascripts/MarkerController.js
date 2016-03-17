function MarkerController(dataUrl, dataRefresheInterval) {
    var availabilityTool = new MarkerArrayAvailabilityTool();
    var visibilityTool = new MarkerArrayVisibilityTool();
    var prevMerkers = [];
    var lastCoords = {};
    var browserTabActive = true;
    var currentRequest = null;

    
    function retreiveDataFromServer(coords, force) {
        if( !shouldScheduleQueryForNewData(coords, force))
            return;
            
        currentRequest = $.ajax({
            url: dataUrl,
            dataType: "jsonp",
            data: { coords },
            success: function (data) {
                currentRequest = null;
                copyCoordsToLastCoords(coords);
                data = visibilityTool.run(null, availabilityTool.run(prevMerkers, data));
                ToTuEventGenerator('NewMarkersData', data);
                
                if( dataRefresheInterval > 0){
                    setTimeout(
                        function () {
                            retreiveDataFromServer(coords, false);
                        }, dataRefresheInterval);
                }
            }
        });
    }
    
    function shouldScheduleQueryForNewData(coords, force){
        return force || browserTabActive &&
                lastCoords.coordN == coords.coordN &&
                lastCoords.coordE == coords.coordE &&
                lastCoords.coordW == coords.coordW &&
                lastCoords.coordS == coords.coordS;
    }
        

    function setNewVisibleCoords(coords)
    {
        abortCurrentRequest();
        retreiveDataFromServer(
            coords,
            true);
    }
    
    function copyCoordsToLastCoords(coords){
        lastCoords.coordN = coords.coordN;
        lastCoords.coordE = coords.coordE;
        lastCoords.coordW = coords.coordW;
        lastCoords.coordS = coords.coordS;
        lastCoords.lastZoom = coords.zoom;
    }
    
    function setActiveTab(isActive){
        if( !browserTabActive && isActive)
            retreiveDataFromServer(lastCoords);
        browserTabActive = isActive;
    }

    function abortCurrentRequest() {
        if (currentRequest != null)
            currentRequest.abort();
    }
    
    return {
        setActiveTab: setActiveTab,
        setNewVisibleCoords:setNewVisibleCoords
    }
}