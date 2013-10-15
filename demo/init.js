$(document).on('mobileinit', function(){
	console.log('mobileinit');
});

$(document).on('pageshow', function(){
	console.log('pageshow');
	$.mobile.activePage.find('.map').leaflet();
});