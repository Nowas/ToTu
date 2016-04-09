var assert = require("assert");
var tools = require("../lib/vehicleStopInfo.js");

describe('Vehicle stop time table tests', function(){
    var now = new Date(2016, 01, 01, 15, 55, 0);
            
    it('empty call passes', function(done){
        tools.getTimeTable(null, now);
        done()
    });

    it('one departure time', function(done){
        var deps = [{line:'1', depH:16, depM:00, direction:'endless'}]
        var tt = tools.getTimeTable(deps, now);
        assert.equal( tt.length, 1);        

        assert.equal( tt[0].line, '1');        
        assert.equal( tt[0].hours.length,1);
        assert.equal( tt[0].hours[0].hour, 16);        
        assert.equal( tt[0].hours[0].minutes.length, 1);        
        assert.equal( tt[0].hours[0].minutes[0].minute, 0);        
        assert.equal( tt[0].hours[0].minutes[0].direction, 'endless');        
        done()
    });

    it('multiple lines', function(done){
        var deps = [{line:'1', depH:16, depM:00, direction:'endless 1'},
                    {line:'1', depH:16, depM:22, direction:'endless 2'},
                    {line:'2', depH:14, depM:10, direction:'endless 3'},
                    {line:'3', depH:12, depM:24, direction:'endless 4'}]
        var tt = tools.getTimeTable(deps, now);
        assert.equal( tt[0].hours[0].minutes.length, 2);        
        assert.equal( tt[0].hours[0].minutes[1].minute, 22);        
        assert.equal( tt[0].hours[0].minutes[1].direction, 'endless 2');        
        assert.equal( tt[2].line, '3');        
        assert.equal( tt[2].hours.length,1);
        assert.equal( tt[2].hours[0].hour, 12);        
        assert.equal( tt[2].hours[0].minutes.length, 1);        
        assert.equal( tt[2].hours[0].minutes[0].minute, 24);        
        assert.equal( tt[2].hours[0].minutes[0].direction, 'endless 4');        
        done()
    });
});