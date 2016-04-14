var assert = require("assert");
var tools = require("../lib/vehicleStopInfo.js");

describe('Vehicle stop next departure tests', function(){
    var now = new Date(2016, 01, 01, 15, 55, 0);
            
    it('empty call passes', function(done){
        tools.getNextDeparture(null, now);
        done()
    });

    it('empty ref time passes', function(done){
        tools.getNextDeparture([], null);
        done()
    });

    it('simple minut test', function(done){
        var deps = [{line:'1', depH:16, depM:00}]
        var nextDeps = tools.getNextDeparture(deps, now);
        assert.equal( nextDeps.length, 1);        
        assert.equal( nextDeps[0].line, '1');        
        assert.equal( nextDeps[0].time, '5 min');        
        done()
    });

    it('simple seconds test', function(done){
        var now = new Date(2016, 01, 01, 15, 59, 55);
        var deps = [{line:'1', depH:16, depM:00}]
        var nextDeps = tools.getNextDeparture(deps, now);
        assert.equal( nextDeps.length, 1);        
        assert.equal( nextDeps[0].line, '1');        
        assert.equal( nextDeps[0].time, '5 sek');        
        done()
    });

    it('simple hour test', function(done){
        var now = new Date(2016, 01, 01, 12, 00, 00);
        var deps = [{line:'1', depH:16, depM:00}]
        var nextDeps = tools.getNextDeparture(deps, now);
        assert.equal( nextDeps.length, 1);        
        assert.equal( nextDeps[0].line, '1');        
        assert.equal( nextDeps[0].time, '16:00');        
        done()
    });

    it('two lines test', function(done){
        var now = new Date(2016, 01, 01, 15, 55, 0);
        var deps = [{line:'1', depH:16, depM:00},
                    {line:'2', depH:16, depM:05}]
        var nextDeps = tools.getNextDeparture(deps, now);
        assert.equal( nextDeps.length, 2);        
        assert.equal( nextDeps[0].line, '1');        
        assert.equal( nextDeps[0].time, '5 min');        
        assert.equal( nextDeps[1].line, '2');        
        assert.equal( nextDeps[1].time, '10 min');        
        done()
    });

    it('two departure times test', function(done){
        var now = new Date(2016, 01, 01, 15, 55, 0);
        var deps = [{line:'1', depH:15, depM:00},
                    {line:'1', depH:16, depM:05}]
        var nextDeps = tools.getNextDeparture(deps, now);
        assert.equal( nextDeps.length, 1);        
        assert.equal( nextDeps[0].line, '1');        
        assert.equal( nextDeps[0].time, '10 min');        
        done()
    });
    
    it('no departure time after ref time test', function(done){
        var now = new Date(2016, 01, 01, 15, 55, 0);
        var deps = [{line:'1', depH:15, depM:00}]
        var nextDeps = tools.getNextDeparture(deps, now);
        assert.equal( nextDeps.length, 1);        
        done()
    });    
});