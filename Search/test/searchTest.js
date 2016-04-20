var assert = require("assert");
var tools = require("../lib/search.js");

describe.skip('Basic search tests', function(){
      it('simple minut test', function(done){
        this.timeout(20000);
        tools.getSearchResult('P', function(dane){
            console.log(dane);
            done();
        })        
    });
});