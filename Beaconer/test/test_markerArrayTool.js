var assert = require("assert");
var tools = require("../public/javascripts/MarkerArrayTool.js");

describe('basic array availability tools tests', function(){
    var builder = new tools();
    function isAdded(item){
        return (item.state == 'added')
    }


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
        var markers = builder.withNewData([{id:'1'}, {id:'2'}]).withAvailability([]).build();
        assert.equal( markers.length, 2);
        assert.equal( markers.filter(isAdded).length, 2);        
        done();
    });
});


describe('basic array sipmple op tools tests', function(){
    var builder = new tools();
    function isVisible(item){
        return (item.visible == true)
    }
    function isRed(item){
        return (item.color == 'red')
    }
    function isSize23(item){
        return (item.size == 23)
    }
    function isVehicle(item){
        return (item.type == 'Vehicle')
    }

    it('empty data on init', function(done){
        var markers = builder.withNewData([]).withVisibility(true).build();
        assert.equal( markers.length, 0);        
        done();
    });

    it('null data test ', function(done){
        var markers = builder.withNewData(null).withVisibility(true).build();
        assert.equal( markers.length, 0);        
        done();
    });

    it('simple array test ', function(done){
        var markers = builder.withNewData([{id:'1'}, {id:'2'}])
            .withVisibility(true)
            .withColor('red')
            .withType('Vehicle')
            .withSize(23)
            .build();
        assert.equal( markers.length, 2);
        assert.equal( markers.filter(isVisible).length, 2);        
        assert.equal( markers.filter(isRed).length, 2);        
        assert.equal( markers.filter(isSize23).length, 2);        
        assert.equal( markers.filter(isVehicle).length, 2);        
        done();
    });
});