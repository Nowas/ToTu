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

function getNextDepartureAsObject(departures, refTime){
    if(!departures)
        departures = [];
        
    if(!refTime)
        refTime = new Date();

    var refTimeSeconds = (refTime.getHours() * 60 + refTime.getMinutes())*60 + refTime.getSeconds();
    var nextDeps = {};

    departures.forEach(function(entry){
        var depTimeSpan =  (entry.depH*60+entry.depM)*60 - refTimeSeconds;
        if( depTimeSpan <= 0)
            depTimeSpan += 60*60*24;        
        if(!nextDeps[entry.line] || 
            nextDeps[entry.line].timeSpan > depTimeSpan)
        {
            nextDeps[entry.line]  = {
                H:entry.depH, 
                M:entry.depM, 
                timeSpan: depTimeSpan,
                direction: entry.direction};
        }   
    });
    return nextDeps;
}

function getTimeTableAsObject(departures, refTime){
    if(!departures)
        departures = [];
        
    if(!refTime)
        refTime = new Date();

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
    return timeTable;
}

exports.getNextDeparture = function(departures, refTime){
    var nextDeps = getNextDepartureAsObject(departures, refTime);
        
    var res = [];
    Object.keys(nextDeps).forEach(function (lineNumber) {
        var depText = getTimeSpanAsText(
                    nextDeps[lineNumber].timeSpan,       
                    nextDeps[lineNumber].H,
                    nextDeps[lineNumber].M); 
        res.push({
            line: lineNumber, 
            time: depText,
            direction: nextDeps[lineNumber].direction});      
    })
    return res;
}


function getTimeSpanAsText(timeSpan, hour, minute){
    if (timeSpan > 3600)
        return (hour%24).padLeft(2) + ":" + (minute).padLeft(2); 
    else if (timeSpan > 60)
        return Math.floor(timeSpan / 60) + " min";
    else
        return timeSpan + " sek";
}    

exports.getTimeTable = function(departures, refTime){
    var timeTable = getTimeTableAsObject(departures, refTime);    
    var nextDeps = getNextDepartureAsObject(departures, refTime);
    console.log(nextDeps);
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
        if(!nextDeps[line])
            console.log(line);
        res.push({
            line:line,
            hours: hours,
            nextDeparture: {
                direction: nextDeps[line].direction,
                nextDeparture: getTimeSpanAsText(
                    nextDeps[line].timeSpan,       
                    nextDeps[line].H,
                    nextDeps[line].M)
            }
        })
    });
    return res;
}

function processVehicleStopDbData(err, data, callback) {
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
}

exports.getVehicleStopInfo = function(id,callback) {
    if(!id)
        return callback([]);
        
    pool.open(cn, function (err, db) {
        if (err) 
            return console.log('e1' + err);
        var sql ='SELECT TLI_NAZWA as line,' +
        ' TLI_OST_PST_NAZWA AS direction,' +
        ' PST_NAZWA as stopName,' +
        ' GODZ_ODJ as depH, MIN_ODJ as depM' +
        ' FROM VIEW_ODJAZDY' +
        ' WHERE PST_ID = ?';
        
        db.query(sql, [id.toString()], function( err, data){
            if (err)
                console.log('e2' + err);
            db.close();
            processVehicleStopDbData(err,data, callback)
        });
    });
    
};
