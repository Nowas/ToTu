var io = require('socket.io-client');
var beaconerConf = require('./lib/configuration')( function(config) {
    
    var Pool = require('odbc-pool')
        , cn = require('./lib/dbconf.js').connStr;
    var pool = new Pool({
        min : 1
        , max : 100
        , log : true
    });



    var socket = io.connect(config.beacons[0].url, {reconnect: true});

    socket.on('connect', function(socket) {
        console.log('Connected!');
    });


    function sendPositionToBeacon(vehData){   
        socket.emit("putVehicle",vehData, function(res){
        });
    };


    function ReadDataFromSimulateDataDB(spreadDelaySec) {
        pool.open(cn, function (err, db) {
            if (err) {
                return console.log('e1' + err);
            }
            db.query('select AKP_FK_KUR_ID as ID, AKP_TLI_NAZWA as IDENTYFIKATOR, AKP_XAKT as DLUGOSC, AKP_YAKT as SZEROKOSC , sysdate as TS, AKP_FK_TLI_ID AS LINIAID from VIEW_AKTUALNE_POLOZENIA', function (err, data) {
                if (err)
                    console.log('e2' + err);

                data.forEach(function (entry) {
                setTimeout(function () { 
                    sendPositionToBeacon(                        
                        {"id":entry.ID,
                            "lineId":entry.LINIAID,
                            "displayText":entry.IDENTYFIKATOR,
                            "lat":entry.SZEROKOSC,
                            "lng":entry.DLUGOSC}); 
                    }, 
                    Math.random() * spreadDelaySec * 1000);
                });
                db.close();
            });
        });
    };

    function loop(spreadDelaySec) {
        ReadDataFromSimulateDataDB(spreadDelaySec);
        setTimeout(function () {
            loop(10);
        }, spreadDelaySec * 1000);
    }

    loop(1)



});
