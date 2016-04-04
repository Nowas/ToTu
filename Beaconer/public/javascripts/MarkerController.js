function MarkerController(dataUrl, dataRefresheInterval, newDataCallback, callbackInitParams) {
    var prevMerkers = [];
    var lastCoords = {};
    var browserTabActive = true;
    var currentRequest = null;
    var callbackParams = callbackInitParams;
    
    function retreiveDataFromServer(coords, force) {
        if( !shouldScheduleQueryForNewData(coords, force))
            return;
            
        currentRequest = $.ajax({
            url: dataUrl,
            dataType: "jsonp",
            data: { coords },
            success: function (newMarkers) {
                currentRequest = null;
                copyCoordsToLastCoords(coords);
                newDataCallback(prevMerkers, newMarkers, callbackParams);
                prevMerkers = newMarkers;
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
        var didFocus = !browserTabActive && isActive 
        browserTabActive = isActive;
        if( didFocus )
            retreiveDataFromServer(lastCoords);
    }

    function abortCurrentRequest() {
        if (currentRequest != null)
            currentRequest.abort();
    }
    
    function setCallbackParams(newParams) {
        callbackParams = newParams;
        newDataCallback(prevMerkers, prevMerkers, callbackParams);
    }

    $(window).on("blur focus", function (e) {
        var prevType = $(this).data("prevType");
        if (prevType != e.type) {   //  reduce double fire issues
            switch (e.type) {
                case "blur":
                    setActiveTab(false);
                    break;
                case "focus":
                    setActiveTab(true);
                    break;
            }
        }
        $(this).data("prevType", e.type);
    });
    
    return {
        setActiveTab: setActiveTab,
        setNewVisibleCoords:setNewVisibleCoords,
        setCallbackParams:setCallbackParams,
    }
}