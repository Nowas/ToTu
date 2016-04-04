var  MarkerArrayTool = function(){
    var dataArray = [],
        dataColor = 'yellow',
        dataSize = 23,
        dataType = null,
        dataVisible = false,
        dataSelectedDisplayText = null;
    
    function build(){
        if( !dataArray)
            return []
            
        dataArray.forEach(function(entry){
            entry.color = dataColor;
            entry.size = dataSize;
            entry.type = dataType;
            if(!dataSelectedDisplayText)
                entry.visible = dataVisible;
            else{
            if( dataSelectedDisplayText == null || entry.displayText == dataSelectedDisplayText)
                entry.visible = true;
            else
                entry.visible = false;
            }
                
        });

        return dataArray;
    }

    function withNewData(newDataArray){
        dataArray = newDataArray;
        return this;
    }
    
    function withAvailability(oldDataArray){
        var markers = [], marker;
        var prevIt=0, newIt=0;

        if( !oldDataArray )
            oldDataArray =  [];
        else
            oldDataArray = oldDataArray.sort(compMarkerFn);
        
        if( !dataArray )
            dataArray =  [];
        else
            dataArray = dataArray.sort(compMarkerFn);

        if( oldDataArray == [] && dataArray== [])
            return [];
            
        while( prevIt < oldDataArray.length || newIt < dataArray.length )
        {
            if (newIt == dataArray.length || compMarkerFn(oldDataArray[prevIt], dataArray[newIt]) < 0){
                marker = oldDataArray[prevIt];
                marker.state = 'removed'; 
                prevIt++;
            }
            else if (prevIt == oldDataArray.length || compMarkerFn(oldDataArray[prevIt], dataArray[newIt]) > 0){ 
                marker = dataArray[newIt]
                marker.state = 'added'; 
                newIt++;
            }
            else
            {
                marker = dataArray[newIt];
                
                if( oldDataArray[prevIt].lat == dataArray[newIt].lat &&
                    oldDataArray[prevIt].lng == dataArray[newIt].lng)
                    marker.state = 'stopped';
                else
                    marker.state = 'moved';
                prevIt++;
                newIt++;
            }
            markers.push(marker);
        }
        dataArray = markers;
        return this;
    }
    function withColor(color){
        dataColor = color;
        return this;
    }
    function withSize(size){
        dataSize = size;
        return this;
    }
    function withType(type){
        dataType = type;
        return this;
    }
    function withVisibility(visible){
        dataVisible = visible;
        return this;
    }
    function withSelectedDataText(selectedDisplayText){
        dataSelectedDisplayText = selectedDisplayText;
        return this;
    }
        
    function compMarkerFn(a, b){
        if( !a || !a.id )
            return 1;
        if( !b || !b.id)
            return -1;
        
        return a.id.localeCompare(b.id);
    }

    return{
        withNewData : withNewData,
        withAvailability:withAvailability,
        withColor:withColor,
        withSize:withSize,
        withType:withType,
        withVisibility:withVisibility,
        withSelectedDataText:withSelectedDataText,
        build:build,
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = MarkerArrayTool;
}