function GoogleMapEvents(map){
    function visibleRegionChangedEvent() {
        var visibleRegion = map.getBounds();
        if (visibleRegion == null)
            return;
            
        ToTuEventGenerator(
            'MapIdle', 
            {coordN : visibleRegion.getNorthEast().lat(),
                coordE : visibleRegion.getNorthEast().lng(),
                coordW : visibleRegion.getSouthWest().lng(),
                coordS : visibleRegion.getSouthWest().lat(),
                zoom : map.getZoom()});
    }
    
    google.maps.event.addListener(map, 'zoom_changed', function () {
        if (map.getZoom() > 17) {
            map.setZoom(17);  // where for me: nn=17
        };
    });

    google.maps.event.addListener(map, 'idle', function () {
        visibleRegionChangedEvent();
    });

}