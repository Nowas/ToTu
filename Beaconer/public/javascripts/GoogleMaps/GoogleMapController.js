var config = {
    lineStyles: {
        normalLine: {
            strokeColor: '#00A0F0',
            strokeOpacity: 0.7,
            strokeWeight: 5
        }
    }
}

var map_style =
 [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 40 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": -10 }, { "lightness": 30 }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -60 }, { "lightness": 10 }] }, { "featureType": "landscape.natural", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": -20 }, { "lightness": 60 }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }, { "saturation": -100 }, { "lightness": 60 }] }
, {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
            { hue: '#FF0000' },
            { visibility: 'on' },
            { lightness: -30 }
        ]
    }
]

function GoogleMapController(mapDivId, startZoom) {  
    var mapOptions = {
        center: new google.maps.LatLng(52.25, 21),
        panControl: false,
        zoom: startZoom,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        zoomControl: true,
        styles: map_style
    }
    var map = new google.maps.Map(document.getElementById(mapDivId),
        mapOptions);
    var trafficLayer = new google.maps.TrafficLayer();

    trafficLayer.setMap(map);    
    GoogleMapEvents(map);
    var vehiclesGmTools = GoogleMapTools(map);
    
    return {
        refreshVehicles:vehiclesGmTools.refreshMerkers,
    }
}