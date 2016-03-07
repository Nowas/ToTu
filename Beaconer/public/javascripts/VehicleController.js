function VehicleController(mapDivId, vehicleMapController) {
    var urlVehicles = $("#" + mapDivId).attr('data-bus-list-url');
    var currentRequest = null;
    var selectedDisplayText;
    var lastCoordN, lastCoordE, lastCoordW, lastCoordS, lastZoom;
    var browserTabActive = true;
    var vehicles = {};
    var dataRefresheInterval = 2500;

    function abortCurrentRequest() {
        if (currentRequest != null)
            currentRequest.abort();
    }
    
    function setSelectedDisplayText(displayText) {
        selectedDisplayText = displayText;
        vehicleMapController.ukryjPojazdy(displayText);
        retreiveDataFromServer(lastCoordN, lastCoordE, lastCoordW, lastCoordS, lastZoom)
    }
    
    function removeSelectedDisplayText() {
        if (selectedDisplayText != null) {
            vehicleMapController.showVehicles();
            selectedDisplayText = null;
            retreiveDataFromServer(lastCoordN, lastCoordE, lastCoordW, lastCoordS, lastZoom)
        }
    }
    
    function retreiveDataFromServerLastCoords() {
        retreiveDataFromServer(lastCoordN, lastCoordE, lastCoordW, lastCoordS, lastZoom)
    }

    function retreiveDataFromServer(coordN, coordE, coordW, coordS, zoom) {
        currentRequest = $.ajax({
            url: urlVehicles,
            data: {
                coordN: coordN,
                coordE: coordE,
                coordW: coordW,
                coordS: coordS,
                priorytet: zoom,
            },
            success: function (data) {
                currentRequest = null;
                updateVehiclesPos(data);
                setTimeout(
                    function () {
                        if (shouldScheduleQueryForNewData(coordN, coordE, coordW, coordS)) {
                            retreiveDataFromServer(coordN, coordE, coordW, coordS, zoom);
                        }

                    }, dataRefresheInterval);
            }
        });
    }
    
    function shouldScheduleQueryForNewData(coordN, coordE, coordW, coordS){
        return browserTabActive &&
                    lastCoordN == coordN &&
                    lastCoordE == coordE &&
                    lastCoordW == coordW &&
                    lastCoordS == coordS;
    }
    
    function updateVehiclesPos(vehiclesFromServer) {
        for (var i = 0; i < vehiclesFromServer.length; i++) {
            var pojazdDB = vehiclesFromServer[i];
            vehicles[vehiclesFromServer.ID] = [pojazdDB.DLUGOSC, pojazdDB.SZEROKOSC];
            vehicleMapController.dodajPojazd(
                vehiclesFromServer.ID, 
                vehiclesFromServer.lat, 
                vehiclesFromServer.lng, 
                vehiclesFromServer.lineID, 
                vehiclesFromServer.displayText, 
                selectedDisplayText);
        }
    }
    
    function setMapCoords(toTuIdleMapEvent)
    {
        lastCoordN = toTuIdleMapEvent.coordN;
        lastCoordE = toTuIdleMapEvent.coordE;
        lastCoordW = toTuIdleMapEvent.coordW;
        lastCoordS = toTuIdleMapEvent.coordS;
        lastZoom = toTuIdleMapEvent.zoom;
    }
    
    function setActiveTab(isActive)
    {
        browserTabActive = isActive;
    }
    
    return {
        
    }
}