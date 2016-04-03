
function GoogleMapTools(googleMap){
    var markersOnMap = {};
    var map = googleMap;
    var icons = GoogleMapIcons();
    
    function refreshMerkers(markers) {
        markers.forEach(function(entry) {
            switch(entry.state) {
                case 'removed':
                    removeMarker(entry);
                    break;
                case 'moved':
                    modifyMarker(entry);
                    break;
                case 'stopped':
                    stopMarker(entry);
                    break;
                case 'added':
                    addMarker(entry);
                    break;
            }
        });
    }
    
    function markerVisibibilityChanged(marker)
    {
        if((markersOnMap[marker.id].map && !marker.visible) || 
            (!markersOnMap[marker.id].map && marker.visible))
           return true; 
        return false;
    }
    
    function stopMarker(marker){
        if( markerVisibibilityChanged(marker) )
            markersOnMap[marker.id].setMap(marker.visible ? map : null);
    }

    function modifyMarker(marker){
        markersOnMap[marker.id].setMap(marker.visible ? map : null);
        markersOnMap[marker.id].setPosition(
            new google.maps.LatLng(marker.lat, marker.lng));
    }

    function removeMarker(marker){
        markersOnMap[marker.id].setMap(null);
        delete markersOnMap[marker.id];
    }
    
    function addMarker(marker){
        var markerOnMap = new google.maps.Marker({
            toTuId: marker.id,
            toTuType: marker.type,
            toTuLineId: marker.lineId,
            toTuDisplayText: marker.displayText,
            icon: icons.getIcon(marker.type,marker.displayText,marker.color,marker.size),
            map: marker.visible ? map : null,
            position: new google.maps.LatLng(marker.lat, marker.lng)
        });

        google.maps.event.addListener(markerOnMap, 'click', function () {
            ToTuEventGenerator(
                'MarkerClicked', 
                {   id: this.toTuId,
                    type: this.toTuType,
                    lineId : this.toTuLineId,
                    displayText : this.toTuDisplayText});
        });
        markersOnMap[marker.id] = markerOnMap;
    }    
    
    return {
        refreshMerkers:refreshMerkers
    }
}