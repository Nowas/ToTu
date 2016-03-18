var assert = require("assert");
var tools = require("../public/javascripts/MarkerArrayTools/MarkerArrayAvailabilityTool.js")();

function isRemoved(item){
    return (item.state == -1)
}

function isModified(item){
    return (item.state == 0)
}

function isAdded(item){
    return (item.state == 1)
}

describe('basic availability tests', function(){
    it('empty data on init', function(done){
        assert.equal( tools.run([],[]).length, 0);        
        done();
    });

    it('null data test ', function(done){
        assert.equal( tools.run(null, null).length, 0);        
        done();
    });

    it('new markers should be set as added', function(done){
        var markers = tools.run([], [{id:'1'}, {id:'2'}]);
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isAdded).length, 2);        
        done();
    });
    it('changed markers should be set as modified', function(done){
        var markers = tools.run([{id:'1'}, {id:'2'}],[{id:'1'}, {id:'2'}]);
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isModified).length, 2);        
        done();
    });
    
    it('not present markers should be set as removed', function(done){
        var markers = tools.run([{id:'1'}, {id:'2'}],[{id:'1'}]);
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isModified).length, 1);        
        assert.equal( markers.filter(isRemoved).length, 1);        
        done();
    });

    it('shoud add one new and one modify', function(done){
        var markers = tools.run([{id:'1'}],[{id:'1'},{id:'3'}]);
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isModified).length, 1);        
        assert.equal( markers.filter(isAdded).length, 1);        
        done();
    });

    it('empty data received shoud clear all', function(done){
        var markers = tools.run([{id:'1'},{id:'3'}],[]);
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isRemoved).length, 2);        
        done();
    });

});