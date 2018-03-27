var App = {
    Version: 1.3,
    Title: "GCcollab"
}

document.addEventListener("deviceready", function () {
    alert("ready app.js");
    window.open = cordova.InAppBrowser.open;
}, false);
