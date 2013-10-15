jquery.mobile.leaflet
=====================

Plugin / Widget for initializing leaflet maps in a jQuery Mobile Application

#Initialization

##Binding the widget

jQuery Mobile comes with a lot of events regarding [pages](http://jquerymobile.com/demos/1.2.0/docs/api/events.html). I would recommend binding the widget via the 'pageshow' Event:

```
$(document).on('pageshow', function(){
	$.mobile.activePage.find('.map').leaflet();
});
```

*Notice*: Even though the plugin works on HTML-Containers with just the matching class. I recommend also putting IDs on your containers, especially if you have multiple maps on one page-element. Otherwise it gets harder if you need to interact with your maps later on.

##Options

You can pass several options to the widget.

```
$.mobile.activePage.find('.map').leaflet({
```
Allows you to hide the leaflet prefix in the attributions
```
	leafletAttribution:true,
```
Config for the initialized leaflet map (The center is Berlin by default)
```
	config : {
		zoomControl:false,
		zoom:11,
		attributionControl:true,
		center:[52.52,13.41]
	},
```
Every map is initialized with a tileLayer, this is the default config
```
	tileLayer:{
		url:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
		config:{
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}
	},
```
Default config for markers added to the map via widget
```
	marker:{},
	initSelector: ".map"
});
```

##Additional Options

In addition to the actual widget initialization you can pass parameters via the HTML-Elment:

```
<div class="map" data-zoom="11" data-lat="52.52" data-lng="13.41" id="map1"></div>
```

`data-lat` and `data-lng` are providing data for the default center of the map. `data-zoom` provides the default zoom for the initialized map object.

##Marker

In a lot of cases you simply want to display one or more marker. There are two ways vor easily displaying markers through this widget. If you just need one default marker you can use the according data-attributes:

```
<div class="map" data-marker-lat="52.52" data-marker-lng="13.41"></div>
```

If you want to add multiple markers you can place a piece of javascript inside your jQuery Mobile page. The name of the variable needs to be "[MAP ID]_marker":

```
<div class="map" id="map1"></div>
<script>
	var map1_marker = [
		[52.52, 13.41],
		{lat:52.54, lng:13.43},
		{lat:52.54, lng:13.43, icon:new L.Icon()}
	];
</script>
```

The variable can hold three types of objects:
* Array with Latitude and Longitude (float, int, string)
* Object with Latitude and Longitude
* Object with Latitude and Longitude + config options according to [L.marker({MarkerOptions})](http://leafletjs.com/reference.html#marker-options)

#Accessing the map for interaction

If you need to access your map for further manipulation, you can easily do this via:

```
$('#map1').leaflet('getMap');
```

If you for example need data about the markers and layers you have already passed your map you can also use this:

```
$('#map1').leaflet('getData');
```

You will receive an object with the folling parameters:

```
{
```
Element holds the reference to the actual HTML-container
```
	element: this.element,
```
Id of the HTML-Container
```
	id: this.element.attr('id'),
```
The actual leaflet map object
```
	map: undefined,
```
Marker that were added to the map through the widget
```
	marker:[],
```
Layer that were added to the map through the widget
```
	layer:[],
```
Lines that were added to the map through the widget
```
	lines:[]
}
```



The plugin is published under the MIT/GPL.

* http://en.wikipedia.org/wiki/MIT_License
* http://en.wikipedia.org/wiki/GNU_General_Public_License

If you make enhancements or code changes i would love to know so i can reshare your findings.