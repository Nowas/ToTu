function retreiveDataFromServer(dataUrl, dataParam, newDataCallback) {
    $.ajax({
        url: dataUrl,
        dataType: "jsonp",
        data: dataParam,
        success: function (data) {
            newDataCallback(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}