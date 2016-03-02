var app = require('../app'),
    assert = require('assert'),
    request = require('supertest');
    
describe('basic tests', function(){
    var lastVehicle;
    
    it('should get a collection of vehicles', function(done){
        request(app)
            .get('/vehicles')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                var result = res.body;
                assert.equal( result.success, true);
                done();
            });
    });
})
    