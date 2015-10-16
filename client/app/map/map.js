var mapModule = angular.module('panacea.map', [])

.controller('MapController', function($scope, heatmapData) {

  var mapOptions = {
    // Map's default center is set to San Francisco for now
    center: {lat: 37.09024, lng: -95.712891},
    zoom: 4
  };
  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var heatmapOptions = {
    data: heatmapData,
    map: $scope.map,
    dissipating: true,
    maxIntensity: 14,
    radius: 12,
    gradient: [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]
  };
  $scope.heatmap = new google.maps.visualization.HeatmapLayer(heatmapOptions);

  // A service for converting between an address and a LatLng
  $scope.geocoder = new google.maps.Geocoder();

  $scope.goToGeocodeLocation = function() {
    var address = $scope.search;
    $scope.geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $scope.map.setCenter(results[0].geometry.location);
        $scope.search = results[0].formatted_address;
        $scope.$apply("search");
      } else {
        alert('Geocode was not sucessful: ' + status);
      }
    });
  }

  // Set current location with HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
  } else {
    // Browser doesn't support Geolocation
    throw new Error();
  }

  $scope.goToCurrentLocation = function() {
    $scope.map.setCenter($scope.currentLocation);
  }

});
