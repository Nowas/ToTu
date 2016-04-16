$(document).ready(function () {
    var cache = {}
    $("#searchText").focus(function () {
        $(this).select();
    });
    $("input[data-lookup='yes']").autocomplete({
        source: function (request, response) {
            var url = this.element.attr('data-action');
            var term = request.term;
            if (url in cache) {
                if (term in cache[url]) {
                    response(cache[url][term]);
                    return;
                }
            }
            else {
                cache[url] = {};
            }

            $.ajax({
                url: url,
                dataType: "jsonp",
                data: {
                    searchTerm: request.term
                },
                success: function (data) {
                    cache[url][term] = $.map(data, function (item) {
                        return {
                            id: item.id,
                            type: item.type,
                            label: item.name,
                            value: item.name
                        }
                    });
                    response(cache[url][term]);
                }
            });
        },
        minLength: 1,
        autoFocus: true,
        select: function (event, ui) {
            if (ui.item != null) {
                this.blur();
                if (ui.item.type == 'PRZYSTANEK') {
                    ToTuEventGenerator('foundVehicleStop', {
                        id: ui.item.id
                    });
                }
                if (ui.item.type == 'LINIA') {
                    ToTuEventGenerator('FoundLine', {
                        id : ui.item.id,
                        description : ui.item.value
                    });
                }
            if ($(window).width() < 480)
                    $(".searchField").toggle("slide",
                        { direction: "left" }, 300);            }
        },
        search: function(event, ui) { 
           $('.spinner').show();
        },
        response: function(event, ui) {
            $('.spinner').hide();
        }
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
        var pole = $("<li>");
        if( item.type == 'PRZYSTANEK'){
            pole.append("<div id='wrapper'><div id='first'><img src='/images/Material/ic_place_black_48px.svg' alt='Smiley face' height='20' width='20'></div><div id='second'><a>" + item.label + ", " + item.type + "</a></div>")
        }
        else{
            pole.append("<div id='wrapper'><div id='first'><img src='/images/Material/ic_directions_bus_black_48px.svg' alt='Smiley face' height='20' width='20'></div><div id='second'><a>" + item.label + ", " + item.type + "</a></div>")
        }
        return pole.appendTo(ul);
    };
});
