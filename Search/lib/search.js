var Pool = require('odbc-pool')
    , cn = require('./dbconf.js').connStr;
var pool = new Pool({
    min : 1
    , max : 100
    , log : true
});

    
exports.getSearchResult = function(searchTerm,callback) {
    if(!searchTerm)
        return callback([searchTerm]);
    pool.open(cn, function (err, db) {
        if (err) 
            return console.log('e1' + err);
    db.query('SELECT MIN(NOB_FK_OBJ_ID) as ID,' +
        ' NOB_NAZWA as NAME,' +
        ' NOB_TYP as TYPE' +
        ' FROM VIEW_NAZWY_OBIEKTOW' +
        ' WHERE UPPER(NOB_NAZWA) like ?' +
        ' GROUP BY NOB_NAZWA, NOB_TYP' + 
        ' ORDER BY NOB_NAZWA', [ searchTerm.toUpperCase() + '%' ], function (err, data) {                                        
    console.log( "b:" + data + err);
            if (err) 
                console.log('e2' + err);
    console.log( searchTerm);
            if(data.length == 0)
                return callback([data]); 
    console.log( searchTerm);
            var searchResult = [];
            data.forEach(function(entry){
                searchResult.push({
                    id: entry.ID, 
                    name: entry.NAME, 
                    type: entry.TYPE
                }); 
            });
            db.close();
            callback(searchResult);
        });
    });
};
