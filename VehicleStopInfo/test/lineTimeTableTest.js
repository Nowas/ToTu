var assert = require("assert");
var tools = require("../lib/vehicleStopInfo.js");

describe('Vehicle stop time table tests', function(){
    var now = new Date(2016, 01, 01, 15, 55, 0);
            
    it('empty call passes', function(done){
        tools.getLineTimeTable(null, now);
        done()
    });

    it('one departure time', function(done){
        var deps = [{line:'1', depH:16, depM:00, direction:'endless'}]
        var tt = tools.getLineTimeTable(deps, now);
        assert.equal( tt.length, 1);        
        assert.equal( tt[0].hour, 16);        
        assert.equal( tt[0].departures.length, 1);        
        assert.equal( tt[0].departures[0].minutes, 0);        
        assert.equal( tt[0].departures[0].direction, 'endless');        
        done()
    });

    it('two departure times', function(done){
        var deps = [{line:'1', depH:16, depM:00, direction:'endless'},
                    {line:'1', depH:16, depM:22, direction:'endless'}]
        var tt = tools.getLineTimeTable(deps, now);
        assert.equal( tt.length, 1);        
        assert.equal( tt[0].hour, 16);        
        assert.equal( tt[0].departures.length, 2);        
        assert.equal( tt[0].departures[1].minutes,22);        
        done()
    });
});