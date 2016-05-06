var Pool = require('odbc-pool')
    , cn = require('./dbconf.js').connStr;
var pool = new Pool({
    min : 1
    , max : 100
    , log : true
});

    
exports.getLineStops = function(lineId)
{                
    if(!lineId)
        return callback([]);
        
    pool.open(cn, function (err, db) {
        if (err) 
            return console.log('e1' + err);
            
        db.query('SELECT PLI_ID as ID,' +
        ' PLI_WSPX as LNG, PLI_WSPY as LAT,' +
        ' FROM VIEW_PRZYSTANKI_LINII' +
        ' WHERE PLI_FK_TLI_ID = ?', [lineId.toString()], function (err, data) {
            
            if (err)
                console.log('e2' + err);
            if(data.length == 0)
                return callback([]); 
            db.close();
            callback(data);
        });
    });
}

exports.getVehicleRunRoute = function(id,callback) {
    if(!id)
        return callback([]);
        
    pool.open(cn, function (err, db) {
        if (err) 
            return console.log('e1' + err);
            
        db.query('SELECT ODT_KOLEJNY as ID,' +
        ' ODT_XOD as XOD, ODT_YOD as YOD,' +
        ' ODT_XDO as XDO, ODT_YDO as YDO' +
        ' FROM VIEW_ODCINKI_TRASY' +
        ' WHERE ODT_FK_KUR_ID = ?' + 
        ' ORDER BY ODT_KOLEJNY', [id.toString()], function (err, data) {
            
            
            if (err)
                console.log('e2' + err);
            if(data.length == 0)
                return callback([]); 
            var polyLine = [{x: data[0].XOD.toString(), y: data[0].YOD.toString()}];
            data.forEach(function(entry){
                polyLine.push({x: entry.XOD.toString(), y:entry.YOD.toString()}) 
            });
            db.close();
            callback(polyLine);
        });
    });
};
