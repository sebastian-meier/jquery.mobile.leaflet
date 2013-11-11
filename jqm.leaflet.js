/*!
 * jQuery Mobile Widget v1.0
 * https://github.com/sebastian-meier/jquery.mobile.leaflet
 *
 * Copyright 2013, Sebastian Meier
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * This plugin requires the jQuery-, jQuery-Mobile & the Leaflet-Library
 *
 */
(function($) {
	$.widget( "mobile.leaflet", $.mobile.widget, {
		options: {
			//Determin if the attribution label for leaflet should be displayed
			leafletAttribution:true,
			//Default Config Object for map initialization
			config : {
				zoomControl:false,
				zoom:11,
				attributionControl:true,
				//Berlin
				center:[52.52,13.41]
				
			},
			//Default TileLayer
			tileLayer:{
				url:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				config:{
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				}
			},
			marker:{
			},
			initSelector: ".map"
		},

		_create: function() {
			var self = this,
			options = $.extend(
				this.options,
				this.element.jqmData('options')
			),
			map = {
				element: this.element,
				id: this.element.attr('id'),
				map: undefined,
				//These 3 array-sets are meant to hold 'pointers' to the data added to our map object for easier access
				marker:[],
				layer:[],
				lines:[]
			};
			self.map = map;

			//Check if the map-container has data-parameters for zoom and default map center
			if( typeof self.map.element.attr('data-zoom') !== 'undefined'){
				self.options.config.zoom = $(this).attr('data-zoom');
			}
			if( typeof self.map.element.attr('data-lat') !== 'undefined' && typeof self.map.element.attr('data-lng') !== 'undefined' ){
				self.options.config.center=[self.map.element.attr('data-lat'),self.map.element.attr('data-lng')];
			}

			//Initialize the map object
			self.map.map = new L.map(
				self.map.id,
				self.options.config
			);

			//Remove the "Leaflet" prefix if set in the options
			if(!options.config.leafletAttribution){
				self.map.map.attributionControl.setPrefix('');
			}

			//Add the default TileLayer as set in options and add it to our layer-set
			self.map.layer.push(L.tileLayer(options.tileLayer.url, options.tileLayer.config).addTo(self.map.map));

			//Check if the map-container has data-parameters for a marker
			if( typeof self.map.element.attr('data-marker-lat') !== 'undefined' && typeof self.map.element.attr('data-marker-lng') !== 'undefined' ){
				self.createMarker([self.map.element.attr('data-marker-lat'),self.map.element.attr('data-marker-lng')]);
			}

			if( eval('typeof '+self.map.id+'_marker') !== 'undefined' ){
				$.each(eval(self.map.id+'_marker'), function(index, value) {
					self.createMarker(value);
				});
			}

		},

		//Create a marker and add it to the map
		//The marker is created from the marker-config in the options
		//data:
		//	Array of float/integer/string: [52.52,13.41]
		//	Object: {lat:52.52, lng:13.41}
		//	Object with Marker Config: {lat:52.52, lng:13.41, icon:L.Icon(), title:'', clickable:true, ...}
		createMarker: function(data){
			var lat, lng, self = this;
			if(data instanceof Array){
				lat = data[0];
				lng = data[1];
			}else if(data instanceof Object){
				lat = data.lat;
				lng = data.lng;
				var options = $.extend(
					this.options.marker,
					data
				);
			}else{
				return undefined;
			}

			var marker = L.marker(new L.LatLng(self.cleanCoordinate(lat), self.cleanCoordinate(lng)), options);
			marker.addTo(self.map.map);
			self.map.marker.push(marker);

			return marker;
		},

		//If latitude comes with "," instead of "." replace them (european)
		cleanCoordinate: function(coord){
			switch(typeof coord){
				case 'String':
					return parseFloat(coord.replace(',', '.'));
				break;
				case 'number':
					return parseFloat(coord);
				break;
				default:
					return coord;
				break;
			}
		},

		//Remove all marker from the map
		clearMarker: function(){
			var self = this;
			$.each(self.map.marker, function(index, value){
				self.map.map.removeLayer(value);
			});
			self.map.marker = [];
		},

		//Remove all lines from the map
		clearLines: function(){
			var self = this;
			$.each(self.map.lines, function(index, value){
				self.map.map.removeLayer(value);
			});
			self.map.lines = [];
		},

		//Remove all layers from the map
		clearLayer: function(){
			var self = this;
			$.each(self.map.layer, function(index, value){
				self.map.map.removeLayer(value);
			});
			self.map.layer = [];
		},

		getMap: function() {
			return this.map.map;
		},

		getData: function(){
			return this.map;
		}

	});
})( jQuery );