var assert = require("assert");
var nock = require("nock");
var tools = require("../lib/collectDataTool.js");

function createSimpleNock(url, resData){
    var myNock = nock(url)
                    .get('/')
                    .reply(200, resData);    
}

describe('basic collect data tests', function(){
    var testUrl = 'http://test.me';              
    var config = [{name:'testBeacon', url:testUrl}]                                                                                                                                                                                                                                                                                            
    
    it('is calling beacon API', function(done){
        createSimpleNock(testUrl, {data:[{id:'1'}]});
        tools.getVehiclesDataFromBeacons(config, function(res){
            done();
        });
    });
});