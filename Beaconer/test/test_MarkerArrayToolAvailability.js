var assert = require("assert");
var tools = require("../public/javascripts/MarkerArrayTool.js");

function isRemoved(item){
    return (item.state == 'removed')
}

function isStopped(item){
    return (item.state == 'stopped')
}

function isAdded(item){
    return (item.state == 'added')
}

describe('basic availability tests', function(){
    var builder = new tools();
    
    it('empty data on init', function(done){
        var markers = builder.withNewData([]).withAvailability([]).build();
        assert.equal( markers.length, 0);        
        done();
    });

    it('null data test ', function(done){
        var markers = builder.withNewData(null).withAvailability(null).build();
        assert.equal( markers.length, 0);        
        done();
    });

    it('new markers should be set as added', function(done){
        var markers = builder.withNewData( [{id:'1'}, {id:'2'}]).withAvailability([]).build();
        assert.equal( markers.length, 2);
        assert.equal( markers.filter(isAdded).length, 2);        
        done();
    });
    it('changed markers should be set as stopped', function(done){
        var markers = builder
            .withNewData( [{id:'1'}, {id:'2'}])
            .withAvailability([{id:'1'}, {id:'2'}]).build();
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isStopped).length, 2);        
        done();
    });
    
    it('not present markers should be set as removed', function(done){
        var markers = builder
            .withNewData( [{id:'1'}])
            .withAvailability([{id:'1'}, {id:'2'}]).build();
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isStopped).length, 1);        
        assert.equal( markers.filter(isRemoved).length, 1);        
        done();
    });

    it('shoud add one new and one modify', function(done){
        var markers = builder
            .withNewData( [{id:'1'}, {id:'3'}])
            .withAvailability([{id:'1'}]).build();
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isStopped).length, 1);        
        assert.equal( markers.filter(isAdded).length, 1);        
        done();
    });

    it('empty data received shoud clear all', function(done){
        var markers = builder
            .withNewData( [])
            .withAvailability([{id:'1'}, {id:'2'}]).build();
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isRemoved).length, 2);        
        done();
    });

});