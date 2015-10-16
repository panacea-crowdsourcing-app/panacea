angular.module('panacea.map', [])
.controller('MapController', function($scope) {

  var mapOptions = {
    center: {lat: -34.055051999999996, lng: -118.44324629999998},
    zoom: 15
  };

  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

});
