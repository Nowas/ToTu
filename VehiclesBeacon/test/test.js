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

    it('should add a two vehicles to collection', function(done){
        request(app)
            .post('/vehicles')
            .send({id:1, lat:10, lng:10, type:'S'})
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                var result = res.body;
                assert.equal( result.success, true);
            });
        request(app)
            .post('/vehicles')
            .send({id:2, lat:10, lng:10, type:'S'})
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                var result = res.body;
                assert.equal( result.success, true);
                done();
            });
    });
    
    it('should get a collection of vehicles with two vehicles', function(done){
        request(app)
            .get('/vehicles')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                var result = res.body;
                assert.equal( result.success, true);
                assert.equal( Object.keys(result.vehicles).length, 2);
                done();
            });
    });    
    
    it('should delete a collection of vehicles with one vehicle', function(done){
        request(app)
            .delete('/vehicles')
            .send({id:1})
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                var result = res.body;
                assert.equal( result.success, true);
                done();
            });
    });    

    it('should get a collection of vehicles with one vehicle', function(done){
        request(app)
            .get('/vehicles')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                var result = res.body;
                assert.equal( result.success, true);
                assert.equal( Object.keys(result.vehicles).length, 1);
                done();
            });
    });    
})
    