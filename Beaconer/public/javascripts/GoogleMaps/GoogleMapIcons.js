function GoogleMapIcons(){
    function vehicleIcon(text, color, xSize, ySize) {
        var svgVehicleTemplate =[
            '<?xml version="1.0"?>',
            '<svg width="{{ xSize }}px" height="{{ ySize }}px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">',
            '<circle style="stroke:#000000;stroke-width: 3;fill:{{ color }}" cx="50" cy="50" r="35"/>',
            '<text x="50" y="65" fill="black" style="font-size: 40px;text-anchor: middle;stroke-width:2px;stroke: #000000;font-family:Arial">{{ text }}</text>',
            '</svg>'
        ].join('\n');

        if( ySize == null)
            ySize = xSize;

        var svg = svgVehicleTemplate.replace('{{ color }}', color).replace('{{ text }}', text).replace('{{ xSize }}', xSize).replace('{{ ySize }}', ySize)
        return {
            url: 'data:image/svg+xml;charset=UTF-8;base64,' +btoa(svg),
            anchor: new google.maps.Point(xSize/2, ySize/2)
        };
    };
    
    function busStopIcon(text, color, xSize, ySize) {
        var svgBusStopTemplate =[
            '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
            '<svg',
            '   xmlns="http://www.w3.org/2000/svg"',
            '   height="{{ xSize }}"',
            '   viewBox="0 0 24 24"',
            '   width="{{ ySize }}">',
            '  <defs',
            '     id="defs5013" />',
            '  <path',
            '     d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"',
            '     style="fill:{{ color }};fill-opacity:1" />',
            '  <path',
            '     d="M0 0h24v24H0z"',
            '     fill="none"/>',
            '</svg>'       
        ].join('\n');

        if( ySize == null)
            ySize = xSize;

        var svg = svgBusStopTemplate.replace('{{ color }}', kolor).replace('{{ xSize }}', xSize).replace('{{ ySize }}', ySize);;
        return {
            url: 'data:image/svg+xml;charset=UTF-8;base64,' +btoa(svg),
            anchor: new google.maps.Point(xSize/2, ySize)
        };
    };
    return{
        vehicleIcon: vehicleIcon,
        busStopIcon: busStopIcon
    }
}
