
function GoogleMapTools(googleMap){
    var markersOnMap = {};
    var map = googleMap;

    function refreshMerkers(markers, icon) {
        markers.forEach(function(entry) {
            switch(entry.state) {
                case -1:
                    removeMarkers(entry);
                    break;
                case 0:
                    modifyMarker(entry);
                    break;
                case 1:
                    addMarker(entry,icon);
                    break;
            }
        });
    }
    
    function modifyMarker(marker){
        markersOnMap[marker.ID].setMap(marker.visible ? map : null);
        markersOnMap[marker.ID].setPosition(
            new google.maps.LatLng(marker.lat, entry.lng));
    }

    function removeMarker(marker){
        markersOnMap[marker.ID].setMap(null);
        delete markersOnMap[marker.ID];
    }
    
    function addMarker(marker, icon){
        var markerOnMap = new google.maps.Marker({
            toTuID: marker.ID,
            toTuLiniaID: marker.lineID,
            toTuDisplayText: marker.displayText,
            icon: icon(marker.displayText,marker.color,marker.size),
            map: marker.visible ? map : null,
            position: new google.maps.LatLng(marker.lat, marker.lng)
        });

        google.maps.event.addListener(markerOnMap, 'click', function () {
            var ev = $.Event('toTuVehicleClicked');
            ev.vehicleID = this.toTuID;
            ev.lineID = this.toTuLineID;
            ev.displayText = this.toTuDisplayText;
            $(window).trigger(ev);
        });
        markersOnMap[marker.ID] = markerOnMap;
    }    
    
    return {
        refreshMerkers:refreshMerkers
    }
}