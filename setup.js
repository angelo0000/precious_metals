$(function() {
    var deviceAgent = navigator.userAgent.toLowerCase();
    window.iOS = deviceAgent.match(/(iphone|ipod|ipad)/) ? true : false;

    $.ajaxSetup({ cache: false });                
    Backbone.history.start();
  
});