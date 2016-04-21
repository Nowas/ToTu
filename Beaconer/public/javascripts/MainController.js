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
        retreiveDataFromServer('http://localhost:3001/vehicleRunRoute', {runId: id},function(data){
            hideLoader();
            ToTuEventGenerator(
                'DrawVehicleRoute',
                data); 
        })
    }

    function displaytimeTable(table, entry){
            table.append('<tr class="timetableHeader"><td><strong>' + entry.line + '</strong></td>'+
                '<td>'+ entry.nextDeparture.direction+'</td>'+
                '<td>'+ entry.nextDeparture.nextDeparture+'</td>'+
                '<td style="width:10px"><i class="glyphicon glyphicon-tasks"" aria-hidden="true"></i></td></tr>');                 
                table.append('<tr class="timetableDetails"><td colspan=4><div class="timetableDetails">'+
                displaytimeTableDetails(entry) +
                '</div></td></tr>');
                // $("table.nextDepartures tr.timetableDetails:last td").html('<p>ddsads</p>');//displaytimeTableDetails(entry));
    }
    
    function displaytimeTableMinutes(minutes){
        var minutesString = "";
        
        minutes.forEach(function(entry){
            minutesString += entry.minute + ' ' 
        });
        return minutesString;
    }

    function displaytimeTableDetails(entry){
        Number.prototype.padLeft = function (n,str){
            return Array(n-String(this).length+1).join(str||'0')+this;
        }

        var detailsTable = $('<table><tr>'+
                                '<td>Godz.</td>'+
                                '<td>Minuty</td>'+
                            '</tr></table>').addClass('table');
            entry.hours.forEach(function(entry){
                detailsTable.append('<tr><td><strong>'+(entry.hour%24).padLeft(2) +'</strong></td><td>'+ displaytimeTableMinutes(entry.minutes) +'</td></tr>'); 
            });     
        return(detailsTable[0].outerHTML);
    }
    
    function retrieveVehicleStopData(id)
    {
        retreiveDataFromServer('http://localhost:3002/vehicleStopInfo', {stopId: id},function(data){
            $("#vehicleStopInfo h2").text(data.stopName);
            var infoDiv = $("div.departures");
            if( !data || !data.timeTable){
                infoDiv.html('Brak aktualnych odjazdów');
            }
            else{
                var table = $('<table id="nextDepartureTable" class="tabe table-striped nextDepartures"><tr>'+
                                '<td>Linia</td>'+
                                '<td>Kierunek</td>'+
                                '<td colspan=2>Odjazdy</td>'+
                            '</tr></table>');             
                
                data.timeTable.forEach(function(entry){
                    displaytimeTable(table, entry);
                });     
                        
                infoDiv.html(table);
                $("div.timetableDetails").hide();
                $("tr.timetableHeader").click(function (event) {
                    event.stopPropagation();
                    var target = $(this).next().find('div.timetableDetails');
                    target.toggle('fold', {}, 500);
                });            
                $("tr.timetableDetails").click(function (event) {
                    event.stopPropagation();
                    $(this).find("div").toggle('fold', {}, 500);
                });
            }
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

    function selectedVehicle(data){
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
    ToTuEventReceiver('MarkerClicked', selectedVehicle);
    ToTuEventReceiver('SearchLineSelected', selectedVehicle);
    ToTuEventReceiver('MapClicked', mapClicked);
    ToTuEventReceiver('ZoomChanged', zoomChanged);
}

var tmc = new MainController(mapConfig);
var gm = GoogleMapController(mapConfig);

