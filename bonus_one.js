// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types
function flexLoad(){
    var text = $('.flexsearch-input').val();
    var json = JSON.parse(this.responseText);
    var arr = [];
    $.each(json["data"], function(key, value){
        if(value.indexOf(text) != -1){
            arr.push(value);
        }
        else{
            return null;
        }
    });
    $("#results").empty();
    $.each(arr, function (k,v){
        var goog = v.split(' ');
        var link = '<a href=http://www.google.com/search?q='+goog.reduce(function(k,v){return k+'+'+v;})+'>'+v+'</a>';
        $("#results").append("<ul class='list-group-item'>" + link + "</ul>");
    });
}
$(function(){
    $('.flexsearch-input').bind("input",function(){
        var flexRequest = new XMLHttpRequest();
        flexRequest.addEventListener("load",flexLoad);
        var url =  "http://www.mattbowytz.com/simple_api.json";
        flexRequest.open("GET",url +"?data=interests");
        flexRequest.send();
    });
});