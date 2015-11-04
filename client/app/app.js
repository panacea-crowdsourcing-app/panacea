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

  $stateProvider.state("default", {
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
        templateUrl: 'app/templates/report.html'
      }
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
.controller('MainController', function($scope, $rootScope) {
  // Need to refactor to be more DRY
  $scope.toggleAbout = function() {
    $scope.about = !$scope.about;
    $scope.feed = false;
    $scope.report = false;
  };
  $scope.toggleFeed = function() {
    $scope.feed = !$scope.feed;
    $scope.about = false;
    $scope.report = false;
    // NEED TO DELETE: new data gets added to $rootScope.data to see
    // if it updates feed
    $rootScope.data.push({
      name: "New Disease Name ",
      location: "Los Angeles, CA, USA",
      coords: [27.782, -134.447],
      time: new Date()
     });
    // Some kind of root function needs to be called to updated the data being
    // used for the Google Map
    $rootScope.update();
    // Some kind of root function needs to be called to updated the data being
    // used for the feed
    $rootScope.updateFeed();
  };
    $scope.toggleReport = function() {
    $scope.report = !$scope.report;
    $scope.about = false;
    $scope.feed = false;
  };
  $rootScope.data= [
   {
    name: "Disease Name 1",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -122.447],
    time: new Date()
   },
   {
    name: "Disease Name 1",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -123.447],
    time: new Date()
   },
   {
    name: "Disease Name 2",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -124.447],
    time: new Date()
   },
   {
    name: "Disease Name 2",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -125.447],
    time: new Date()
   },
   {
    name: "Disease Name 3",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -126.447],
    time: new Date()
   },
   {
    name: "Disease Name 3",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -127.447],
    time: new Date()
   },
   {
    name: "Disease Name 4",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -128.447],
    time: new Date()
   },
   {
    name: "Disease Name 4",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -129.447],
    time: new Date()
   },
   {
    name: "Disease Name 5",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -130.447],
    time: new Date()
   },
   {
    name: "Disease Name 5",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -131.447],
    time: new Date()
   },
   {
    name: "Disease Name 6",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -132.447],
    time: new Date()
   },
   {
    name: "Disease Name 6",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -133.447],
    time: new Date()
   },
   {
    name: "Disease Name 7",
    location: "Los Angeles, CA, USA",
    coords: [37.782, -134.447],
    time: new Date()
   }
  ];
});
