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

var mapConfig = { 
    mapDivId: 'map', 
    zoom: 15, 
    vehUrl:'http://localhost/data/vehicles',
    vehStopUrl:'http://localhost/data/vehicleStops' };

function MainController(config) {
    var vehicleController = new VehicleMarkerController(config.vehUrl, 1 * 1000);
    var vehicleStopController = new VehicleStopMarkerController(config.vehStopUrl, 60 * 1000);
    
    function setNewVisibleCoords(data){
        vehicleController.setNewVisibleCoords(data);
        // if(data.zoom < 10)
        //     vehicleStopController.SetSelectedDisplayText(123);
        // else
        //     vehicleStopController.SetSelectedDisplayText(null);
        vehicleStopController.setNewVisibleCoords(data);      
    }
    
    function markerClicked(data){
        vehicleController.setSelectedDisplayText(data.displayText);
    }
        
    function mapClicked(data){
        vehicleController.setSelectedDisplayText(null);
    }

    ToTuEventReceiver('MapIdle', setNewVisibleCoords);
    ToTuEventReceiver('MarkerClicked', markerClicked);
    ToTuEventReceiver('MapClicked', mapClicked);
    
    
}

var tmc = new MainController(mapConfig);
var gm = GoogleMapController(mapConfig);

