
function GoogleMapTools(googleMap){
    var markersOnMap = {};
    var map = googleMap;

    function refreshMerkers(removedMerkers, modifiedMarkers, addedMarkers, icon) {
        removeMarkers(removedMerkers);
        addMarkers(addedMarkers, icon);
        modifyMarkers(modifiedMarkers);
    }
    
    function modifyMarkers(markers){
        markers.forEach(function(entry) {            
            markersOnMap[entry.ID].setMap(entry.visible ? map : null);
            markersOnMap[entry.ID].setPosition(
                new google.maps.LatLng(entry.lat, entry.lng));
        });
    }

    function removeMarkers(markers){
        markers.forEach(function(entry) {
            markersOnMap[entry.ID].setMap(null);
            delete markersOnMap[entry.ID];
        });
    }
    
    function addMarkers(markers, icon){
        markers.forEach(function(entry) {
            var marker = new google.maps.Marker({
                toTuID: entry.ID,
                toTuLiniaID: entry.lineID,
                toTuDisplayText: entry.displayText,
                icon: icon(entry.displayText,entry.color,entry.size),
                map: entry.visible ? map : null,
                position: new google.maps.LatLng(entry.lat, entry.lng)
            });

            google.maps.event.addListener(marker, 'click', function () {
                var ev = $.Event('toTuVehicleClicked');
                ev.vehicleID = this.toTuID;
                ev.lineID = this.toTuLineID;
                ev.displayText = this.toTuDisplayText;
                $(window).trigger(ev);
            });
            markersOnMap[entry.ID] = marker;
        });
    }    
    
    return {
        refreshMerkers:refreshMerkers
    }
}