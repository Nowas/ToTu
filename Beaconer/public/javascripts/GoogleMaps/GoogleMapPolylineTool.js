
function GoogleMapPolylineTool(googleMap){
    var map = googleMap;
    function draw(data){
        console.log(data);
    }
    return{
        draw:draw,
    }
}