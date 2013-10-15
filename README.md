jquery.mobile.leaflet
=====================

Plugin / Widget for initializing leaflet maps in a jQuery Mobile Application

#Initialization

##Binding the widget

jQuery Mobile comes with a lot of events regarding [pages](http://...). I would recommend binding the widget via the 'pageshow' Event:

`$(document).on('pageshow', function(){
	$.mobile.activePage.find('.map').leaflet();
});`

##Options

You can pass several options to the widget.

`$.mobile.activePage.find('.map').leaflet({`
Allows you to hide the leaflet prefix in the attributions
`	leafletAttribution:true,`
Config for the initialized leaflet map (The center is Berlin by default)
`	config : {`
`		zoomControl:false,`
`		zoom:11,`
`		attributionControl:true,`
`		center:[52.52,13.41]`
`	},`
Every map is initialized with a tileLayer, this is the default config
`	tileLayer:{`
`		url:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', `
`		config:{`
`			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'`
`		}`
`	},`
Default config for markers added to the map via widget
`	marker:{},`
`	initSelector: ".map"`
});

##Additional Options


The plugin is published under the MIT/GPL.

* http://en.wikipedia.org/wiki/MIT_License
* http://en.wikipedia.org/wiki/GNU_General_Public_License

If you make enhancements or code changes i would love to know so i can reshare your findings.