angular.module('panacea.feed', [])
.controller('FeedController', function($scope) {
  console.log("swag");
  $scope.items = [];
          for (var i = 0; i < 1000; i++) {
            $scope.items.push(i);
          }
});
