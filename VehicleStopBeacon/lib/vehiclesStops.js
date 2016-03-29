
var Pool = require('odbc-pool')
    , cn = require('./dbconf.js').connStr;
var pool = new Pool({
    min : 1
    , max : 100
    , log : true
});


exports.getVehiclesStops = function(fromLng, fromLat, toLng, toLat){
    var param = [ fromLng, fromLat, toLng, toLat];
    
    db.open(cn, function (err) {
        if (err) {
            return console.log('e1' + err);
        }

        db.query('SELECT PST_ID as ID,'+
            ' PST_WSP_X as LNG, PST_WSP_Y as LAT' +
            ' FROM VIEW_PRZYSTANKI' +
            ' WHERE PST_WSP_X >= ?'+
            ' and PST_WSP_X <= ?'+
            ' AND PST_WSP_Y >= ?'+
            ' AND PST_WSP_Y <= ?' , param, function (err, data) {
            var res = [];
            if (err)
                console.log('e2' + err);
            db.close();
            res = data.map(function(entry){
               return   {"id":'\'' + entry.ID + '\'',
                        "lineId":"",
                        "displayText":"",
                        "lat":entry.LAT,
                        "lng":entry.LNG}; 
            });
            return res;
        });
    });
    
    return res;
}