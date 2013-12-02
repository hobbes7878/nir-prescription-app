var map = L.map('map',{
	scrollWheelZoom: false

}).setView([54.620, -6.8], 8);


L.tileLayer('http://{s}.tile.cloudmade.com/e87822f63861499982c677d840781aa7/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 11,
    minZoom: 6
}).addTo(map);


