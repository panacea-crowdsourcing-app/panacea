angular.module('panacea', [
  'ngMaterial',
  'panacea.services',
  'panacea.map',
  'panacea.globe',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/map/map.html',
      controller: 'MapController'
    })
    .when('/map', {
      templateUrl: 'app/map/map.html',
      controller: 'MapController'
    })
    .when('/globe', {
      templateUrl: 'app/globe/globe.html',
      controller: 'GlobeController'
    })
    .otherwise({
      redirectTo: '/map'
    });
});

