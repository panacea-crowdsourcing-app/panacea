angular.module('panacea.map', [])
.controller('MapController', function($scope) {

  var mapOptions = {
    center: {lat: 54.055051999999996, lng: -118.44324629999998},
    zoom: 8
  };

  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  $scope.geocoder = new google.maps.Geocoder();

  $scope.goToLocation = function() {
    var address = $scope.search;
    $scope.geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $scope.map.setCenter(results[0].geometry.location);
      } else {
        alert('Geocode was not sucessful: ' + status);
      }
    });
  }

  // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        $scope.map.setCenter(pos);
      });
    } else {
      // Browser doesn't support Geolocation
      throw new Error();
    }
});
