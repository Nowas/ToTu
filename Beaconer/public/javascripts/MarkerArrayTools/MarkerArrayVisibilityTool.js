var  MarkerArrayVisibilityTool = function(){

        function run(color, size, selectedDisplayText, markers){
            if( !markers )
                return [];
            markers.forEach(function(entry){
                    if( selectedDisplayText == null || entry.displayText == selectedDisplayText)
                    entry.visible = true;
                else
                    entry.visible = false;
                entry.color = color;
                entry.size = size;
            });
            return markers;
        }
        
        return {
            run:run,
        }
    };

if (typeof module !== "undefined" && module.exports) {
    module.exports = MarkerArrayVisibilityTool;
}