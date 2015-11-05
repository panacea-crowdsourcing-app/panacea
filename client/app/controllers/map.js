var mapModule = angular.module('panacea.map', [])

.controller('MapController', function($scope, $rootScope) {

  $rootScope.update = function(){
    diseaseList = {
    "All Diseases": []
  };

  for (var i = 0; i < $rootScope.data.length; i++) {
    diseaseList["All Diseases"].push(new google.maps.LatLng($rootScope.data[i].coords[0], $rootScope.data[i].coords[1]));
  }
    for (var i = 0; i < $rootScope.data.length; i++) {
      if (diseaseList[$rootScope.data[i].name]) {
        diseaseList[$rootScope.data[i].name].push(new google.maps.LatLng($rootScope.data[i].coords[0], $rootScope.data[i].coords[1]));
      } else {
        diseaseList[$rootScope.data[i].name] = [new google.maps.LatLng($rootScope.data[i].coords[0], $rootScope.data[i].coords[1])];
      }
    }
    $scope.heatmapChoices = [];
    for (var disease in diseaseList) {
      $scope.heatmapChoices.push(disease);
    }
    $scope.heatmapChoices.sort();
  };

  var diseaseList = {
    "All Diseases": []
  };

  for (var i = 0; i < $rootScope.data.length; i++) {
    diseaseList["All Diseases"].push(new google.maps.LatLng($rootScope.data[i].coords[0], $rootScope.data[i].coords[1]));
  }

  for (var i = 0; i < $rootScope.data.length; i++) {
    if (diseaseList[$rootScope.data[i].name]) {
      diseaseList[$rootScope.data[i].name].push(new google.maps.LatLng($rootScope.data[i].coords[0], $rootScope.data[i].coords[1]));
    } else {
      diseaseList[$rootScope.data[i].name] = [new google.maps.LatLng($rootScope.data[i].coords[0], $rootScope.data[i].coords[1])];
    }
  }

  // Set current location with HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // Intiate map after retreiving user's current location
      initMap($scope.currentLocation);
    });
  } else {
    // Throw error if browser doesn't support Geolocation
    throw new Error();
  }

  var initMap = function(currentLocation) {

    var mapOptions = {
      center: currentLocation,
      zoom: 2,
      minZoom: 2,
      backgroundColor: '#B3D1FF',
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      }
    };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $rootScope.map = $scope.map;

    var heatmapOptions = {
      data: diseaseList["All Diseases"],
      map: $scope.map,
      dissipating: false,
      maxIntensity: 2,
      radius: 3,
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

  $scope.heatmapChoices = [];
  for (var disease in diseaseList) {
    $scope.heatmapChoices.push(disease);
  }
  $scope.heatmapChoices.sort();

  $rootScope.userChoice = $scope.heatmapChoices[0];
  $scope.userChoice = $rootScope.userChoice;

  $scope.changeHeatmap = function(diseaseName) {
    $scope.heatmap.setData(diseaseList[diseaseName]);
  };

  $rootScope.changeHeatmap = $scope.changeHeatmap;

  $scope.goToGeocodeLocation = function() {
    var address = $scope.search;
    $scope.geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $scope.map.setCenter(results[0].geometry.location);
        $scope.search = results[0].formatted_address;
        $scope.$apply("search");
      }
    });
  };

  $scope.goToCurrentLocation = function() {
    $scope.map.setCenter($scope.currentLocation);
  };

});
