var mapModule = angular.module('panacea.map', [])

.controller('MapController', function($scope, $rootScope, heatmapData, heatmapData2) {

  // Set current location with HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.currentLocation = $rootScope.center || {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // Intiate map after retreiving user's current location
      initMap($scope.currentLocation);
      $scope.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
  } else {
    // Throw error if browser doesn't support Geolocation
    throw new Error();
  }

  var initMap = function(currentLocation) {

    var mapOptions = {
      center: currentLocation,
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
        // cyan/teal
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        // blue
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        // purple
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        // red
        'rgba(255, 0, 0, 1)'
      ]
    };

    $scope.heatmap = new google.maps.visualization.HeatmapLayer(heatmapOptions);

    // A service for converting between an address and a LatLng
    $scope.geocoder = new google.maps.Geocoder();
  };

  $scope.userChoice = "";
  $scope.heatmapChoices = [1, 2];

  $scope.changeHeatmap = function() {
    if ($scope.userChoice == 1) {
      $scope.heatmap.setData(heatmapData);
    } else {
      $scope.heatmap.setData(heatmapData2);
    }
  }

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
  };

  $scope.goToCurrentLocation = function() {
    $scope.map.setCenter($scope.currentLocation);
  };

});
