angular.module('panacea', [
  'ngMaterial',
  'ngMessages',
  'panacea.services',
  'panacea.map',
  'panacea.report',
  'panacea.feed',
  'ui.router'
])
.config(function($mdThemingProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("default", {
        url: '/',
        "views": {
              'map': {
                  templateUrl: 'app/templates/map.html',
                  controller: 'MapController'
              },
              'about': {
                  templateUrl: 'app/templates/about.html'
              },
              'feed': {
                  templateUrl: 'app/templates/feed.html'
              },
              'report': {
                  templateUrl: 'app/templates/report.html',
                  controller: 'FeedController'
              },
          }
      });

      $urlRouterProvider.otherwise("/");

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo', {
        'default': '600', // by default use shade for primary intentions
        'hue-1': '300', // use shade for <code>md-hue-1</code> class
        'hue-2': '700', // use shade for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade for the <code>md-hue-3</code> class
      })
      .backgroundPalette('grey', {
        'default': '200'
      })
      .accentPalette('green', {
        'default': '300' // use shade 200 for default, and keep all other shades the same
      });
})
.controller('MenuController', function($scope) {
  $scope.toggleAbout = function() {
    $scope.about = !$scope.about;
    $scope.feed = false;
    $scope.report = false;
  };
    $scope.toggleFeed = function() {
    $scope.feed = !$scope.feed;
    $scope.about = false;
    $scope.report = false;
  };
    $scope.toggleReport = function() {
    $scope.report = !$scope.report;
    $scope.about = false;
    $scope.feed = false;
  };
});
