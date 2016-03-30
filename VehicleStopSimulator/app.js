var io = require('socket.io-client');
var beaconerConf = require('./lib/configuration').getConfig()[0];

var Pool = require('odbc-pool')
    , cn = require('./lib/dbconf.js').connStr;
var pool = new Pool({
    min : 1
    , max : 100
    , log : true
});

var socket = io.connect(beaconerConf.url, {reconnect: true});

socket.on('connect', function(socket) {
    console.log('Connected!');
});


function sendPositionToBeacon(vehStopData){   
    socket.emit("putVehicleStops",vehStopData, function(res){
    });
};


function ReadDataFromDB(fromLng, fromLat, toLng, toLat) {
    var param = [ fromLng, toLng, fromLat, toLat];
    
    pool.open(cn, function (err, db) {
        if (err) {
            return console.log('e1' + err);
        }
        db.open(cn, function (err) {
            if (err) {
                return console.log('e1' + err);
            }

            db.query('SELECT PST_ID as ID,'+
                ' PST_WSP_X as LNG, PST_WSP_Y as LAT' +
                 ' FROM VIEW_PRZYSTANKI' //+ 
                // ' WHERE PST_WSP_X >= ?'+
                // ' and PST_WSP_X <= ?'+
                // ' AND PST_WSP_Y >= ?'+
                // ' AND PST_WSP_Y <= ?' , [ 0, 10, 0, 10]
                , function (err, data) {
                if (!err)
                {
                    var res = data.map(function(entry){
                        return   {"id": entry.ID ,
                                    "lat":entry.LAT,
                                    "lng":entry.LNG}; 
                    });
                    sendPositionToBeacon(res)
                }
                console.log('e2' + err);
                db.close();
                return;
            });
        });
    });
}

ReadDataFromDB(-180,-90,180,90);


