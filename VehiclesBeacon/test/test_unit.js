var veh = require('../lib/vehicles'),
    assert = require('assert');
    
describe('basic tests', function(){
    it('should get a collection of vehicles', function(done){
        assert.equal( veh.getVehicles().length, 0);
        done();
    });

    it('should add a two vehicles to collection', function(done){
        veh.addVehicle({id:1, lat:10, lng:10, type:'S'});
        veh.addVehicle({id:2, lat:10, lng:10, type:'S'});
        done();
    });
    
    it('should get a collection of vehicles with two vehicles', function(done){
        assert.equal( veh.getVehicles().length, 2);
        done();
    });    
    
    it('should delete a collection of vehicles with one vehicle', function(done){
        veh.deleteVehicle(2);
        done();
    });    

    it('should get a collection of vehicles with two vehicles', function(done){
        assert.equal( veh.getVehicles().length, 1);
        done();
    });    
})
    