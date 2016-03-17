

var  MarkerArrayAvailabilityTool = function(){
        
        function sortMarkerFn(a, b){
            return a.ID.localeCompare(b.ID);
        }
        
        function run(prevMarkers, newMarkers){
            var markers = [], marker;
            var prevIt=0, newIt=0;

            if( !prevMarkers )
                prevMarkers =  [];
            else
                prevMarkers = prevMarkers.sort(sortMarkerFn);
            
            if( !newMarkers )
                newMarkers =  [];
            else
                newMarkers = newMarkers.sort(sortMarkerFn);


            while( prevIt < prevMarkers.length || newIt < newMarkers.length )
            {
                if (prevMarkers[prevIt] < newMarkers[newIt] ||
                        newIt == newMarkers.length){
                    marker = prevMarkers[prevIt];
                    marker.state = -1; 
                    prevIt++;
                }
                else if (prevMarkers[prevIt] > newMarkers[newIt] ||
                        prevIt == prevMarkers.length){ 
                    marker = newMarkers[newIt]
                    marker.state = 1; 
                    newIt++;
                }
                else
                {
                    marker = prevMarkers[prevIt];
                    marker.state = 0; 
                    prevIt++;
                    newIt++;
                }
                marker.color = 'red';
                marker.size =23;
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