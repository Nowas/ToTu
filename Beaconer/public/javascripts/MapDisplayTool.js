function toggleFullScreen(elem) {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function showLoader() {
    $("#loader").show();
}

function hideLoader() {
    $("#loader").hide();
}

$(".map-info-right").bind("swiperight click", function () {
    hideRightInfo();
});

function showRightInfo() {
    showMenuPanle(".map-info-right", "right"); 
}

function hideRightInfo() {
    manuUkryjPanel(".map-info-right", "right");
}

function showMenuPanle(mapInfoClass, direction) {
    $(mapInfoClass).show("slide",
        { direction: direction }, 300);
   
}

function manuUkryjPanel(mapInfoClass, direction) {
    $(mapInfoClass).hide("slide",
        { direction: direction }, 300);
}


$(".map-full-screen-btn").bind("click", function () {
    toggleFullScreen(document.body);
});
