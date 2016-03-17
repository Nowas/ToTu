
function GoogleMapTools(googleMap){
    var markersOnMap = {};
    var map = googleMap;
    var icons = GoogleMapIcons();
    
    function refreshMerkers(markers) {
        markers.forEach(function(entry) {
            switch(entry.state) {
                case -1:
                    removeMarkers(entry);
                    break;
                case 0:
                    modifyMarker(entry);
                    break;
                case 1:
                    addMarker(entry);
                    break;
            }
        });
    }
    
    function modifyMarker(marker){
        markersOnMap[marker.ID].setMap(marker.visible ? map : null);
        markersOnMap[marker.ID].setPosition(
            new google.maps.LatLng(marker.lat, marker.lng));
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
            icon: icons.vehicleIcon(marker.displayText,marker.color,marker.size),
            map: marker.visible ? map : null,
            position: new google.maps.LatLng(marker.lat, marker.lng)
        });

        google.maps.event.addListener(markerOnMap, 'click', function () {
            ToTuEventGenerator(
                'MarkerClicked', 
                {id: this.toTuID,
                    lineID : this.toTuLineID,
                    displayText : this.toTuDisplayText});
        });
        markersOnMap[marker.ID] = markerOnMap;
    }    
    
    return {
        refreshMerkers:refreshMerkers
    }
}