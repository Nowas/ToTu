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
    
    function retrieveVehicleData(id)
    {
        retreiveDataFromServer('http://localhost:3001/vehicleRoute', {runId: id},function(data){
            hideLoader();
            ToTuEventGenerator(
                'DrawVehicleRoute',
                data); 
        })
    }

    function retrieveVehicleStopData(id)
    {
        retreiveDataFromServer('http://localhost:3002/vehicleStopInfo', {stopId: id},function(data){
            $(".map-info-right").html(data.stopName);

                $("td[colspan=3]").find(".rozklad").hide();
                $(".odjazdy").click(function (event) {
                    event.stopPropagation();
                    var $target = $(event.target);
                    if ($target.closest("td").attr("colspan") > 1) {
                        $target.slideUp();
                    } else {
                        $target.closest("tr").next().find(".rozklad").slideToggle();
                    }
                });
                            showRightInfo();
            hideLoader();
        })
    }

function showVehicleStopData(data)
{
   var str;

   str = "<table width='100%' border='0' cellspacing='0' cellpadding='0' align='left'>";
   str += "<tr><th width='55'>Rang</th><th width='80'>Name</th></tr>";


   for (i = 0; i < array_count; i++) {
       str += "<tr><td width='55'>" + array_count[i] + "</td><td width='85'>" + array_count_Name[i] + "</td></tr>";
   }

   str += "</table>";

   return str;
}

    function markerClicked(data){
        vehicleController.setSelectedDisplayText(data.displayText);
        showLoader();
        if( data.type == 'Vehicle')
            retrieveVehicleData(data.id);
        else
            retrieveVehicleStopData(data.id);
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

