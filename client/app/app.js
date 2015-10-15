angular.module('panacea', [
  'panacea.services',
  'panacea.dashboard', // can change this to "home" or "map," whatever we decide
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
    .otherwise({
      redirectTo: '/'
    });
});
