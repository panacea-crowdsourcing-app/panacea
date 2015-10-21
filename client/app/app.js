angular.module('panacea', [
  'ngMaterial',
  'panacea.services',
  'panacea.map',
  'panacea.globe',
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
    .otherwise({
      redirectTo: '/globe'
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo', {
        'default': '600', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '300', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '700', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      .accentPalette('light-green', {
        'default': 'A200' // use shade 200 for default, and keep all other shades the same
      });
});

