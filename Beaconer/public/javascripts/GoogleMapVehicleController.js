function GoogleMapVehicleController(map) {
    var vehicles = {};
    var tools = GoogleMapTools();
    
     function updateVehicleOnMap(ID, lat, lng, lineID, displayText, selectedDisplayText) {
        var marker;
        var currentPosition = tools.convertPositionLatLngToGoogleLatLan(lat, lng);

        if (vehicles[ID] != null) {
            marker = vehicles[ID];
            marker.setPosition(currentPosition);
        }
        else {
            marker = addVehicleMarkerToMap(
                ID,
                lineID,
                displayText,
                currentPosition);
        }
        if (selectedDisplayText == null ||
            selectedDisplayText == displayText)
            marker.setMap(map);
        else
            marker.setMap(null);

    }
   
    function addVehicleMarkerToMap(ID, lineID, displayText, position) {
        var marker = new google.maps.Marker({
            toTuID: ID,
            toTuLiniaID: lineID,
            toTuDisplayText: displayText,
            icon: tools.vehicleIcon( displayText, 23),
            map: map,
            position: position,
        });

        google.maps.event.addListener(marker, 'click', function () {
            var ev = $.Event('toTuVehicleClicked');
            ev.vehicleID = this.toTuID;
            ev.lineID = this.toTuLineID;
            ev.displayText = this.toTuDisplayText;
            $(window).trigger(ev);
        });
        vehicles[ID] = marker;
        return marker;
    }
    
    function removeVehicles()
    {
        for (var prop in vehicles) {
            vehicles[prop].setMap(null);
            delete vehicles[prop];
        }
    }
    
    function hideVehicles(leaveVisibleDisplaytext) {
        for (var prop in vehicles) {
            if (vehicles[prop].toTuDisplayText != leaveVisibleDisplaytext)
                vehicles[prop].setMap(null);
        }
    }
    
    function showVehicles() {
        for (var prop in vehicles) {
            vehicles[prop].setMap(map);
        }
    }
    
    return {
        updateVehicleOnMap:updateVehicleOnMap,
        removeVehicle:removeVehicle,
        hideVehicle:hideVehicle,
        showVehicle:showVehicle
    }
}