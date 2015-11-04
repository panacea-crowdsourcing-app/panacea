angular.module('panacea.feed', [])
.controller('FeedController', function($scope, $rootScope) {
  $rootScope.updateFeed = function() {
    var reverse = $rootScope.data.slice(0);
    $scope.items = reverse.reverse();
  }
  var reverse = $rootScope.data.slice(0);
  $scope.items = reverse.reverse();
  $scope.viewOnMap = function(name, coords){
    $rootScope.map.setCenter({
      lat: coords[0],
      lng: coords[1]
    });
    $rootScope.userChoice = name;
    $rootScope.changeHeatmap($rootScope.userChoice);
    $scope.toggleFeed();
    console.log("swag");
  };
});
