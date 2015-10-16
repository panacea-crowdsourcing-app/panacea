angular.module('panacea', [
  'panacea.services',
  'panacea.dashboard', // can change this to "home" or "map," whatever we decide
  'panacea.map',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashController'
    })
    .when('/dashboard', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashController'
    })
    .when('/map', {
      templateUrl: 'app/map/map.html',
      controller: 'MapController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
