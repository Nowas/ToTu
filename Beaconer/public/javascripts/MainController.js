var opts = {
    lines: 13 // The number of lines to draw
, length: 28 // The length of each line
, width: 14 // The line thickness
, radius: 42 // The radius of the inner circle
, scale: 1 // Scales overall size of the spinner
, corners: 0.5 // Corner roundness (0..1)
, color: '#3A87AD' // #rgb or #rrggbb or array of colors
, opacity: 0.25 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1 // Rounds per second
, trail: 60 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: true // Whether to render a shadow
, hwaccel: true // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}
var target = document.getElementById('loader')
var spinner = new Spinner(opts).spin(target);


function MainController(mapDivId) {
    var mapController = new GoogleMapController(mapDivId, 15);
    var pasangerPosition = { lat: 0, lng: 0 };

    function testGeolokacji() {
        return navigator.geolocation == true;
    }

    google.maps.event.addDomListener(window, 'load', function(){
        var markers = [{ID:'1', lineID:1, displayText:'12', lat:52.25, lng:21,color:'pink', size:23},
            {ID:'2', lineID:1, displayText:'13', lat:52.25, lng:21.01,color:'red', size:23}];
            
        markers = MarkerArrayVisibilityTool().run(
            '12'
            ,MarkerArrayAvailabilityTool().run(
                []
                ,markers));
        mapController.refreshVehicles(markers,GoogleMapIcons().vehicleIcon);
    });
}

var tmc = new MainController("map");

