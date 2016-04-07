var Pool = require('odbc-pool')
    , cn = require('./dbconf.js').connStr;
var pool = new Pool({
    min : 1
    , max : 100
    , log : true
});

    
exports.getVehicleRoute = function(id,callback) {
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
