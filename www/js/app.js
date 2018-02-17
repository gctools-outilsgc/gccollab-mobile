var App = {
    Version: 1.3,
    Title: "GCcollab"
}

document.addEventListener("deviceready", function() {
    window.open = cordova.InAppBrowser.open;
}, false);
