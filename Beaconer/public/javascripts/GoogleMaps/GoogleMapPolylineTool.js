var config = {
    lineStyles: {
        normalLine: {
            strokeColor: '#00A0F0',
            strokeOpacity: 0.7,
            strokeWeight: 5
        }
    }
}

function GoogleMapPolylineTool(googleMap){
    var map = googleMap;
    var vehicleRoute = null;
    
    function draw(data){
        var gPoint = [];
        data.forEach( function(entry){
            gPoint.push(new google.maps.LatLng(entry.y, entry.x));
        });
        
        vehicleRoute = new google.maps.Polyline({
            path: gPoint,
            geodesic: true,
            strokeColor: config.lineStyles.normalLine.strokeColor,
            strokeOpacity: config.lineStyles.normalLine.strokeOpacity,
            strokeWeight: config.lineStyles.normalLine.strokeWeight
        });

        vehicleRoute.setMap(map);
    }
    
    function clear(){
        if( vehicleRoute)
            vehicleRoute.setMap(null);
    }
    return{
        clear: clear,
        draw:draw,
    }
}