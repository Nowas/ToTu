var assert = require("assert");
var ctl = require("../public/javascripts/VehicleArrayTool.js");
var tools = ctl.VehicleArrayTool();


describe('basic tests', function(){
    it('empty data on init', function(done){
        tools.newData([]);
        assert.equal( tools.removedVehicles.length, 0);        
        assert.equal( tools.modifiedVehicles.length, 0);        
        assert.equal( tools.addedVehicles.length, 0);        
        done();
    });

    it('new vehicles should be set as added', function(done){
        tools.newData([{ID:'1'}, {ID:'2'}]);
        assert.equal( tools.removedVehicles.length, 0);        
        assert.equal( tools.modifiedVehicles.length, 0);        
        assert.equal( tools.addedVehicles.length, 2);        
        done();
    });
    it('changed vehicles should be set as modified', function(done){
        tools.newData([{ID:'1'}, {ID:'2'}]);
        assert.equal( tools.removedVehicles.length, 0);        
        assert.equal( tools.modifiedVehicles.length, 2);        
        assert.equal( tools.addedVehicles.length, 0);        
        done();
    });
    
    it('not present vehicles should be set as removed', function(done){
        tools.newData([{ID:'1'}]);
        assert.equal( tools.removedVehicles.length, 1);        
        assert.equal( tools.modifiedVehicles.length, 1);        
        assert.equal( tools.addedVehicles.length, 0);        
        done();
    });

    it('shoud add one new and one modify', function(done){
        tools.newData([{ID:'1'},{ID:'3'}]);
        assert.equal( tools.removedVehicles.length, 0);        
        assert.equal( tools.modifiedVehicles.length, 1);        
        assert.equal( tools.addedVehicles.length, 1);        
        done();
    });

    it('empty data received shoud clear all', function(done){
        tools.newData([]);
        assert.equal( tools.removedVehicles.length, 2);        
        assert.equal( tools.modifiedVehicles.length, 0);        
        assert.equal( tools.addedVehicles.length, 0);        
        done();
    });

});