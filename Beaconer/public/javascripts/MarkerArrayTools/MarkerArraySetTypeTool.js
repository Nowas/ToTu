var  MarkerArraySetTypeTool = function(){

        function run(type, markers){
            if( !markers )
                return [];
            markers.forEach(function(entry){
                entry.type = type;
            });
            return markers;
        }
        
        return {
            run:run,
        }
    };

if (typeof module !== "undefined" && module.exports) {
    module.exports = MarkerArraySetTypeTool;
}