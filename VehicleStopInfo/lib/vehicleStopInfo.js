var Pool = require('odbc-pool')
    , cn = require('./dbconf.js').connStr;
var pool = new Pool({
    min : 1
    , max : 100
    , log : true
});
    
Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}

exports.getNextDeparture = function(departures, refTime){
    if(!departures)
        return [];
        
    if(!refTime)
        refTime = new Date();

    var refTimeSeconds = (refTime.getHours() * 60 + refTime.getMinutes())*60 + refTime.getSeconds();
    var nextDeps = {};
    
    departures.forEach(function(entry){
        var depTimeSpan =  (entry.depH*60+entry.depM)*60 - refTimeSeconds;
        if( depTimeSpan <= 0)
            return;
            
        if(!nextDeps[entry.line] || 
            (nextDeps[entry.line].depTimeSpan > depTimeSpan && depTimeSpan > refTimeSeconds))
        {
            nextDeps[entry.line]  = {depH:entry.depH, depM:entry.depM, depTimeSpan: depTimeSpan};
        }   
    });
    
    var res = [];
    Object.keys(nextDeps).forEach(function (lineNumber) {
        var depText = "";
        if (nextDeps[lineNumber].depTimeSpan > 3600)
            depText = (nextDeps[lineNumber].depH%24).padLeft(2) + ":" + (nextDeps[lineNumber].depM).padLeft(2); 
        else if (nextDeps[lineNumber].depTimeSpan > 60)
            depText = Math.floor(nextDeps[lineNumber].depTimeSpan / 60) + " min";
        else
            depText = nextDeps[lineNumber].depTimeSpan + " sek";
        res.push({line: lineNumber, time: depText});      
    })
    return res;
}

exports.getTimeTable = function(departures, refTime){
    if(!departures)
        return [];
        
    if(!refTime)
        refTime = new Date();

    var refTimeHour = refTime.getHours();
    var refTimeMinutes = refTime.getMinutes();
    
    var timeTable = {};
    departures.forEach(function(entry){
        if(!timeTable[entry.line])
            timeTable[entry.line] = {};
        if(!timeTable[entry.line][entry.depH])
            timeTable[entry.line][entry.depH] = [];
        timeTable[entry.line][entry.depH].push(
            { minute: entry.depM,
              direction: entry.direction});
        
    });
    
    var res = [];
    Object.keys(timeTable).forEach(function (line) {
        var hours = []
        Object.keys(timeTable[line]).forEach(function (hour) {
            hours.push({
                hour: hour,
                minutes: timeTable[line][hour].sort(function(a, b) {
                    return a.minutes - b.minutes;
                    })
            })
        })
        res.push({
            line:line,
            hours: hours
        })
    });
    return res;
}

exports.getVehicleStopInfo = function(id,callback) {
    if(!id)
        return callback([]);
        
    pool.open(cn, function (err, db) {
        if (err) 
            return console.log('e1' + err);

        db.query('SELECT TLI_NAZWA as line,' +
        ' TLI_OST_PST_NAZWA AS direction,' +
        ' PST_NAZWA as stopName,' +
        ' GODZ_ODJ as depH, MIN_ODJ as depM' +
        ' FROM VIEW_ODJAZDY' +
        ' WHERE PST_ID = ?', [id.toString()], function (err, data) {
            if (err)
                console.log('e2' + err);
            db.close();
            if(data.length == 0)
                return callback([]);
            data = data.map(function(e){
                return  {
                    line:e.LINE,
                    direction:e.DIRECTION,
                    stopName:e.STOPNAME,
                    depH:e.DEPH,
                    depM:e.DEPM
                };
                
            });
            callback({
                stopName: data[0].stopName,
                timeTable: exports.getTimeTable(data)
            });
        });
    });
    
};
