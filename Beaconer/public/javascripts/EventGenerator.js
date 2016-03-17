var ToTuEventGenerator = function(name, jsonData, onObject){
    var ev = $.Event('toTu' + name);
    ev.toTuData = jsonData;
    if( !onObject )
        onObject = $(window);
    onObject.trigger(ev);
}
var ToTuEventReceiver = function(name, callback, onObject){
    if( !onObject )
        onObject = $(window);
    onObject.on('toTu' + name, function(ev){
        callback(ev.toTuData);
    });   
}