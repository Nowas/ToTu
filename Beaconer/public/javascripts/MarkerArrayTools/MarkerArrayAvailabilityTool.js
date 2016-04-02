

var  MarkerArrayAvailabilityTool = function(){
        
        function compMarkerFn(a, b){
            if( !a || !a.id )
                return 1;
            if( !b || !b.id)
                return -1;
            
            return a.id.localeCompare(b.id);
        }
        
        function run(prevMarkers, newMarkers){
            var markers = [], marker;
            var prevIt=0, newIt=0;

            if( !prevMarkers )
                prevMarkers =  [];
            else
                prevMarkers = prevMarkers.sort(compMarkerFn);
            
            if( !newMarkers )
                newMarkers =  [];
            else
                newMarkers = newMarkers.sort(compMarkerFn);

            if( prevMarkers == [] && newMarkers== [])
                return [];
                
            while( prevIt < prevMarkers.length || newIt < newMarkers.length )
            {
                if (newIt == newMarkers.length || compMarkerFn(prevMarkers[prevIt], newMarkers[newIt]) < 0){
                    marker = prevMarkers[prevIt];
                    marker.state = 'removed'; 
                    prevIt++;
                }
                else if (prevIt == prevMarkers.length || compMarkerFn(prevMarkers[prevIt], newMarkers[newIt]) > 0){ 
                    marker = newMarkers[newIt]
                    marker.state = 'added'; 
                    newIt++;
                }
                else
                {
                    marker = newMarkers[newIt];
                    
                    if( prevMarkers[prevIt].lat == newMarkers[newIt].lat &&
                        prevMarkers[prevIt].lng == newMarkers[newIt].lng)
                        marker.state = 'stopped';
                    else
                        marker.state = 'moved';
                    prevIt++;
                    newIt++;
                }
                markers.push(marker);
            }
            return markers;
        }
        return {
            run: run
        }
    };

if (typeof module !== "undefined" && module.exports) {
    module.exports = MarkerArrayAvailabilityTool;
}