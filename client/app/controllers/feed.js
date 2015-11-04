angular.module('panacea.feed', [])
.controller('FeedController', function($scope) {
  $scope.items = [];
          for (var i = 0; i < 50; i++) {
            $scope.items.push(i);
          }
});
