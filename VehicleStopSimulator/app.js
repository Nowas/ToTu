var io = require('socket.io-client');
var beaconerConf = require('./lib/configuration').getConfig()[0];

var db = require('odbc')()
    , cn = require('./lib/dbconf.js').connStr;

var socket = io.connect(beaconerConf.url, {reconnect: true});

socket.on('connect', function(socket) {
    ReadDataFromDB(-180,-90,180,90);
});


function sendPositionToBeacon(vehStopData){   
    socket.emit("putVehicleStops",vehStopData, function(res){
        socket.disconnect();
    });
};


function ReadDataFromDB(fromLng, fromLat, toLng, toLat) {
    var param = [ fromLng.toString(), toLng.toString(), fromLat.toString(), toLat.toString()];
    db.open(cn, function (err) {
        if (err) return console.log('e1' + err);
        db.query('SELECT PST_ID as ID,'+
            ' PST_WSP_X as LNG, PST_WSP_Y as LAT' +
            ' FROM VIEW_PRZYSTANKI' + 
            ' WHERE PST_WSP_X >= ?'+
            ' and PST_WSP_X <= ?'+
            ' AND PST_WSP_Y >= ?'+
            ' AND PST_WSP_Y <= ?' , param
            , function (err, data) {
            if (!err)
            {
                var res = data.map(function(entry){
                    return   {"id": entry.ID.toString() ,
                                "lat":entry.LAT,
                                "lng":entry.LNG}; 
                });
                sendPositionToBeacon(res)
            }
            else
                console.log(err);
            db.close();
            return;
        });
    });
}




