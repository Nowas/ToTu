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
        $("#loader").show();
        retreiveDataFromServer('http://localhost:3001/vehicleRoute', {runId: data.id},function(data){
            $("#loader").hide();
            ToTuEventGenerator(
                'DrawVehicleRoute',
                data); 
        })
    }
        
    function mapClicked(data){
        vehicleController.setSelectedDisplayText(null);
    }

    function zoomChanged(data){
        vehicleStopController.zoomChanged(data.zoom);
    }

    ToTuEventReceiver('MapIdle', setNewVisibleCoords);
    ToTuEventReceiver('MarkerClicked', markerClicked);
    ToTuEventReceiver('MapClicked', mapClicked);
    ToTuEventReceiver('ZoomChanged', zoomChanged);
}

var tmc = new MainController(mapConfig);
var gm = GoogleMapController(mapConfig);

