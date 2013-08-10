var map;
var infowindow;
var lat;
var long;

function set(){

					if (navigator.geolocation) {
					// Get current position
					navigator.geolocation.getCurrentPosition(function (position) {
							// Success!
							initialize(position.coords.latitude, position.coords.longitude);
						});
						}
					else
					{
						alert('Geolocation is not supported in your browser. Try: Chrome, Firefox or Safari');
					}
}

function initialize(lat, long) {
  var pyrmont = new google.maps.LatLng(lat, long);
  //new google.maps.LatLng(25.7808333, -80.1872222);
alert(pyrmont+'<-- This is your current location');
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: pyrmont,
    zoom: 12
  });

  var request = {
    location: pyrmont,
    radius: 50000,
    query: 'pizza'
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
var iconBase='Close.png';
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
	icon: iconBase 
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', set);
