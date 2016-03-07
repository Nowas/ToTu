function GoogleMapEvents(map){
    function init() {
        google.maps.event.addListener(map, 'zoom_changed', function () {
            if (map.getZoom() > 17) {
                map.setZoom(17);  // where for me: nn=17
            };
        });

        google.maps.event.addListener(map, 'idle', function () {
            visibleRegionChangedEvent();
        });
    }
    
    function visibleRegionChangedEvent() {
        var visibleRegion = map.getBounds();
        if (visibleRegion == null)
            return;
        var ev = $.Event('toTuIdleMap');
        ev.coordN = visibleRegion.getNorthEast().lat();
        ev.coordE = visibleRegion.getNorthEast().lng();
        ev.coordW = visibleRegion.getSouthWest().lng();
        ev.coordS = visibleRegion.getSouthWest().lat();
        ev.zoom = map.getZoom();
        ev.forceRefresh = false;
        $(window).trigger(ev);
    }


    init();
}