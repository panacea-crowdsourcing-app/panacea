angular.module('panacea', [
  'ngMaterial',
  'ngMessages',
  'panacea.services',
  'panacea.map',
  'panacea.globe',
  'panacea.report',
  'ngRoute'
])
.config(function($routeProvider, $mdThemingProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/globe/globe.html',
      controller: 'GlobeController'
    })
    .when('/map', {
      templateUrl: 'app/map/map.html',
      controller: 'MapController'
    })
    .when('/globe', {
      templateUrl: 'app/globe/globe.html',
      controller: 'GlobeController'
    })
    .when('/report', {
      templateUrl: 'app/report/report.html',
      controller: 'ReportController'
    })
    .otherwise({
      redirectTo: '/globe'
    });

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
      .accentPalette('light-green', {
        'default': 'A200' // use shade 200 for default, and keep all other shades the same
      });
});

