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
                dataType: "json",
                data: {
                    maxRows: 10,
                    szukanaFraza: request.term
                },
                success: function (data) {
                    cache[url][term] = $.map(data.obiekty, function (item) {
                        return {
                            id: item.ObiektID,
                            typ: item.Typ,
                            label: item.Nazwa,
                            value: item.Nazwa
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
                if (ui.item.typ == 'PRZYSTANEK') {
                    var ev = $.Event('wyszukanoPrzystanekTT');
                    ev.przystanekID = ui.item.id;
                    $(window).trigger(ev);
                }
                if (ui.item.typ == 'LINIA') {
                    var ev = $.Event('wyszukanoLinieTT');
                    ev.liniaID = ui.item.id;
                    ev.identyfikator = ui.item.value;
                    $(window).trigger(ev);
                }
                if ($(window).width() < 480)
                    $(".map-info-bottom").toggle("slide",
                        { direction: "left" }, 300);
            }
        },
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
        var pole = $("<li>");
        if( item.typ == 'PRZYSTANEK'){
            pole.append("<div id='wrapper'><div id='first'><img src='/images/Material/ic_place_black_48px.svg' alt='Smiley face' height='20' width='20'></div><div id='second'><a>" + item.label + ", " + item.typ + "</a></div>")
        }
        else{
            pole.append("<div id='wrapper'><div id='first'><img src='/images/Material/ic_directions_bus_black_48px.svg' alt='Smiley face' height='20' width='20'></div><div id='second'><a>" + item.label + ", " + item.typ + "</a></div>")
        }
        return pole.appendTo(ul);
    };
});
