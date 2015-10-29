angular.module('panacea', [
  'ngMaterial',
  'ngMessages',
  'panacea.services',
  'panacea.map',
  'panacea.globe',
  'panacea.report',
  'ui.router'
])
.config(function($mdThemingProvider, $locationProvider, $stateProvider) {

    $stateProvider
            .state('map', {
                url: '/map',
                views: {
                    'content': {
                        templateUrl: 'app/map/map.html',
                        controller: 'MapController'
                    },
                    'dropdown': {
                        templateUrl: 'app/map/map-dropdown.html',
                        controller: 'MapController'
                    },
                    'report': {
                        templateUrl: 'app/report/report.html',
                        controller: 'ReportController'
                    }
                }
            })
            .state('globe', {
                url: '/globe',
                views: {
                    'content': {
                        templateUrl: 'app/globe/globe.html',
                        controller: 'GlobeController'
                    },
                    'report': {
                        templateUrl: 'app/report/report.html',
                        controller: 'ReportController'
                    }
                    // Need to change GlobeController to a sigleton so that the dropdown menu
                    // can interact with the globe
                    // 'dropdown': {
                    //     templateUrl: 'app/globe/globe-dropdown.html',
                    //     controller: 'GlobeController'
                    // }
                }
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
})
.controller('mainController', function($scope){
  $scope.toggleSide = function() {
    $scope.hide = !$scope.hide;
  };
});
