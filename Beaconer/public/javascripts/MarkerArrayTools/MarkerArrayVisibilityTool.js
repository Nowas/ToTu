var  MarkerArrayVisibilityTool = function(){

        function run(selecteDisplayText, markers){
            markers.forEach(function(entry){
                if( selecteDisplayText == null || entry.displayText == selecteDisplayText)
                    entry.visible = true;
                else
                    entry.visible = false;
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