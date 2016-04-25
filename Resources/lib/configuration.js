var server = 'localhost';

var beacons = [
  {
      url: server,
      latFrom: -90,
      lngFrom: -180,
      latTo: 90,
      LngTo: 180,
  }  
];
    
var search = [
  {
      url: server + ':5004',
  }  
];

var routeInfo = [
  {
      url: server + ':5002',
  }  
];

var stopInfo = [
  {
      url: server + ':5003',
  }  
];

var db = {
    url: 'totu.nowaccy.pl',
};

exports.getBeacons = function(){
    return beacons;
}

exports.getSearch = function(){
    return search;
}

exports.getRouteInfo = function(){
    return routeInfo;
}

exports.getStopInfo = function(){
    return stopInfo;
}

exports.getDb = function(){
    return db;
}

exports.getFullConfig = function(){
    return {
        beacons: exports.getBeacons(),
        search: exports.getSearch(),
        routeInfo: exports.getRouteInfo(),
        stopInfo: exports.getStopInfo(),
        db: exports.getDb(),
    };
}

