
function GoogleMapTools(googleMap){
    var markersOnMap = {};
    var map = googleMap;
    var icons = GoogleMapIcons();
    
    function refreshMerkers(markers) {
        markers.forEach(function(entry) {
            switch(entry.state) {
                case -1:
                    removeMarker(entry);
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
        console.log(marker);
        markersOnMap[marker.id].setMap(marker.visible ? map : null);
        markersOnMap[marker.id].setPosition(
            new google.maps.LatLng(marker.lat, marker.lng));
    }

    function removeMarker(marker){
        markersOnMap[marker.id].setMap(null);
        delete markersOnMap[marker.id];
    }
    
    function addMarker(marker, icon){
        var markerOnMap = new google.maps.Marker({
            toTuId: marker.id,
            toTuLiniaId: marker.lineId,
            toTuDisplayText: marker.displayText,
            icon: icons.vehicleIcon(marker.displayText,marker.color,marker.size),
            map: marker.visible ? map : null,
            position: new google.maps.LatLng(marker.lat, marker.lng)
        });

        google.maps.event.addListener(markerOnMap, 'click', function () {
            ToTuEventGenerator(
                'MarkerClicked', 
                {id: this.toTuId,
                    lineId : this.toTuLineId,
                    displayText : this.toTuDisplayText});
        });
        markersOnMap[marker.id] = markerOnMap;
    }    
    
    return {
        refreshMerkers:refreshMerkers
    }
}