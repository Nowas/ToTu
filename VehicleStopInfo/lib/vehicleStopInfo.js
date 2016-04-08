var Pool = require('odbc-pool')
    , cn = require('./dbconf.js').connStr;
var pool = new Pool({
    min : 1
    , max : 100
    , log : true
});
    
exports.getVehicleStopInfo = function(id,callback) {
    if(!id)
        return callback([]);
        
    pool.open(cn, function (err, db) {
        if (err) 
            return console.log('e1' + err);
        var date = new Date();
        var hour = date.getHours();
        var min  = date.getMinutes();
        var sec  = date.getSeconds();
        var totalMinutes = hour * 60 + min;
        var totalSec = totalMinutes * 60 + sec;

        db.query('SELECT TLI_NAZWA as LINE,' +
        ' MIN24,TLI_OST_PST_NAZWA AS DEST,' +
        ' PST_NAZWA as STOP_NAME,' +
        ' GODZ_ODJ as DEP_H, MIN_ODJ as DEP_M' +
        ' FROM VIEW_ODJAZDY' +
        ' WHERE PST_ID = ?' + 
        ' ORDER BY MIN24', [id.toString(), totalMinutes.toString()], function (err, data) {
            if (err)
                console.log('e2' + err);
            if(data.length == 0)
                return callback([]); 
            var routes = {};
            data.forEach(function(entry){
                if(!routes[entry.LINE])
                {
                    routes[entry.LINE] = {};
                    routes[entry.LINE]['departures'] = {}
                }
                if(!routes[entry.LINE]['departures'][entry.DEP_H])
                    routes[entry.LINE]['departures'][entry.DEP_H] = [];
                    
                var nextDep = ((entry.MIN24 * 60 - totalSec) + 24*60*60) % (24*60*60);
                var nextDepText = "";
                if (nextDep > 3600)
                    nextDepText = entry.DEP_H%24 + ":" + entry.DEP_M; 
                else if (nextDep > 60)
                    nextDepText = Math.floor(nextDep / 60) + " min";
                else
                    nextDepText = nextDep + " sek";
                if( !routes[entry.LINE]['nextDep'] && entry.MIN24 > totalMinutes)
                    routes[entry.LINE]['nextDep'] = nextDepText;
                routes[entry.LINE]['departures'][entry.DEP_H].push( entry.DEP_M);
            });

            db.close();
            callback(routes);
        });
    });
    
};
