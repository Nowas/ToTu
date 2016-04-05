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
            
        db.query('SELECT KUR_FK_TLI_ID as LINEID'+
            ' FROM OK_KURSY' +
            ' WHERE KUR_ID = ?', [id.toString()], function (err, data) {
            db.query('SELECT ODL_KOLEJNY as ID,' +
            ' ODL_XOD as XOD, ODL_YOD as YOD,' +
            ' ODL_XDO as XDO, ODL_YDO as YDO' +
            ' FROM VIEW_ODCINKI_LINII' +
            ' WHERE ODL_FK_TLI_ID = ?' + 
            ' ORDER BY ODL_KOLEJNY', [data[0].LINEID.toString()], function (err, data) {
                
                
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
    });
};
