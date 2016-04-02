var assert = require("assert");
var tools = require("../public/javascripts/MarkerArrayTools/MarkerArrayVisibilityTool.js")();

function isVisible(item){
    return (item.visible == true)
}

function isHidden(item){
    return (item.visible == false)
}

describe('basic visibility tests', function(){
    it('empty data on empty input', function(done){
        assert.equal( tools.vehicle(null, null, null, null).length, 0);        
        done();
    });

    it('markers should be visible when no SelectedDisplayText is not selected', function(done){
        var markers = tools.vehicle(null, null, null, [{ID:'1'},{ID:'2'}]);
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isVisible).length, 2);        
        done();
    });
    it('markers without displayText should be hidden if selectedDisplaytext is selected', function(done){
        var markers = tools.vehicle(null, null, "selText", [{ID:'1'},{ID:'2'}]);
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isVisible).length, 0);        
        assert.equal( markers.filter(isHidden).length, 2);        
        done();
    });
    
    it('markers with different displayText from selectedDisplaytext should be hidden', function(done){
        var markers = tools.vehicle(null, null, "SelText", [{ID:'1', displayText:'test1'},{ID:'2', displayText:'SelText'}]);
        assert.equal( markers.length, 2);        
        assert.equal( markers.filter(isVisible).length, 1);        
        assert.equal( markers.filter(isHidden).length, 1);        
        done();
    });

    it('markers with different displayText from selectedDisplaytext should be hidden (multi version)', function(done){
        var markers = tools.vehicle(null, null, "SelText", [
            {ID:'1', displayText:'test1'},
            {ID:'2', displayText:'SelText'},
            {ID:'3', displayText:'test2'},
            {ID:'4', displayText:'test3'},
            {ID:'2', displayText:'SelText'}]);
        assert.equal( markers.length, 5);        
        assert.equal( markers.filter(isVisible).length, 2);        
        assert.equal( markers.filter(isHidden).length, 3);        
        done();
    });
});