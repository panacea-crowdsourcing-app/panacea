angular.module('panacea', [
  'ngMaterial',
  'ngMessages',
  'panacea.services',
  'panacea.map',
  'panacea.report',
  'panacea.feed',
  'ui.router',
  'ngMdIcons'
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
.controller('MainController', function($scope, $rootScope, $mdToast) {
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
  };

  $scope.toggleReport = function() {
    $scope.report = !$scope.report;
    $scope.about = false;
    $scope.feed = false;
  };

  // Need to refactor so it's not saved to $rootScope
  var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
    function sanitizePosition() {
      var current = $scope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }
  $rootScope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .content('Report submitted!')
        .position("top right")
        .hideDelay(2500)
    );
    console.log("swag");
  };

  $rootScope.data= [
   {
    name: "Malaria",
    location: "Taiwan, Chiayi County",
    coords: [25.534, 120.559],
    time: new Date()
   },
   {
    name: "Pneumonia",
    location: "Abuja, Nigera",
    coords: [9.064331, 7.489297],
    time: new Date()
   },
   {
    name: "Typhoid Fever",
    location: "Alexandria, VA, United States",
    coords: [38.804665, -77.043614],
    time: new Date()
   },
   {
    name: "Malaria",
    location: "Aligarh, India",
    coords: [27.881541, 78.069022],
    time: new Date()
   },
   {
    name: "Poliomyelitis",
    location: "Amsterdam, Netherlands",
    coords: [52.371009, 4.900112],
    time: new Date()
   },
   {
    name: "Malaria",
    location: "Barcelona, Spain",
    coords: [41.38256, 2.177135],
    time: new Date()
   },
   {
    name: "Hepatitis",
    location: "Bonn, Germany",
    coords: [50.735851,  7.10066],
    time: new Date()
   },
   {
    name: "Typhoid Fever",
    location: "Boston, MA, United States",
    coords: [42.358894, -71.056742],
    time: new Date()
   },
   {
    name: "Dengue Fever",
    location: "Bulacan, Phillipines",
    coords: [15, 121.083333],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Cordoba, Colombia",
    coords: [8.334471,  -75.666624],
    time: new Date()
   },
   {
    name: "Influenza",
    location: "Cuernavaca, Mexico",
    coords: [18.921246, 99.234121],
    time: new Date()
   },
   {
    name: "Malaria",
    location: "Dixon, IL, United States",
    coords: [41.8936, -71.056742],
    time: new Date()
   },
   {
    name: "Seasonal Influenza",
    location: "Evanston, IL, United States",
    coords: [42.052157, -87.687867],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Goiânia, Goiás, Brazil",
    coords: [-16.838909, -49.283893],
    time: new Date()
   },
   {
    name: "Influenza",
    location: "Guatemala, Guatemala",
    coords: [14.642516, -90.513138],
    time: new Date()
   },
   {
    name: "Influenza",
    location: "Hidalgo, Mexico",
    coords: [22.233889, -97.830278],
    time: new Date()
   },
   {
    name: "Malaria",
    location: "Gausganj, India",
    coords: [27.0858, 80.314003],
    time: new Date()
   },
   {
    name: "Dengue Fever",
    location: "London , United Kingdom",
    coords: [51.507276, -0.12766],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Los Angeles, CA, United States",
    coords: [34.052238, -118.243344],
    time: new Date()
   },
   {
    name: "Malaria",
    location: "Los Angeles, CA, United States",
    coords: [34.052238, -118.243344],
    time: new Date()
   },
   {
    name: "Influenza",
    location: "Mexico City, Mexico",
    coords: [ 19.43253, -99.13321],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Minneapolis, MN, United States",
    coords: [44.977479, -93.264346],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Eldon, MO, United States",
    coords: [38.3675, -92.477244],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Montevideo, Uruguay",
    coords: [-34.905904, -56.191357],
    time: new Date()
   },
   {
    name: "Malaria",
    location: "Mumbai, India",
    coords: [18.95238, 72.832711],
    time: new Date()
   },
   {
    name: "Poliomyelitis",
    location: "New York, NY, United States",
    coords: [40.713054, -74.007228],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Nashville, TN, United States",
    coords: [36.166687,  -86.779932],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Jos Rd, Nigeria",
    coords: [8.70389283380344,  8.561482429504395],
    time: new Date()
   },
   {
    name: "Malaria",
    location: "Nürnberg, Germany",
    coords: [49.45385,  11.077324],
    time: new Date()
   },
   {
    name: "Malaria",
    location: "Miyali Rd, Pakistan",
    coords: [31.474501,  70.770103],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Pasir Ris, Singapore",
    coords: [1.371327,  103.940701],
    time: new Date()
   },
   {
    name: "Malaria",
    location: "Buenos Aires, Argentina",
    coords: [-34.7916,  -58.350718],
    time: new Date()
   },
   {
    name: "Dengue Fever",
    location: "Rio de Janeiro, Brazil",
    coords: [-22.911014,  -43.209373],
    time: new Date()
   },
   {
    name: "Streptococcal pharyngitis",
    location: "San Francisco, CA, United States",
    coords: [37.78008,  -122.420168],
    time: new Date()
   },
   {
    name: "Poliomyelitis",
    location: "Scottsdale, AZ, United States",
    coords: [33.494909,  -111.926061],
    time: new Date()
   },
   {
    name: "Poliomyelitis",
    location: "Seattle, WA, United States",
    coords: [47.603229,  -122.33028],
    time: new Date()
   },
   {
    name: "Poliomyelitis",
    location: "Singapore",
    coords: [1.290453,  103.852038],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Ľubietová, Slovakia",
    coords: [48.708149,  19.493172],
    time: new Date()
   },
   {
    name: "Influenza",
    location: "Toluca de Lerdo, Mexico",
    coords: [19.292545,  -99.656901],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Toronto, Canada",
    coords: [43.651893,  -79.381713],
    time: new Date()
   },
   {
    name: "Cholera",
    location: "Woodston, KS, United States",
    coords: [39.390897,  -99.066067],
    time: new Date()
   },
   {
    name: "HIV/AIDS",
    location: "Valencia, Venezuela",
    coords: [10.170488,  -68.001121],
    time: new Date()
   },
   {
    name: "Dengue Fever",
    location: "12, Venezuela",
    coords: [7.159467,  -66.245689],
    time: new Date()
   },
   {
    name: "HIV/AIDS",
    location: "12, Venezuela",
    coords: [7.159467,  -66.245689],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "12, Venezuela",
    coords: [7.159467,  -66.245689],
    time: new Date()
   },
   {
    name: "Ebola",
    location: "Washington, DC, United States",
    coords: [38.892062,  -77.019912],
    time: new Date()
   },
   {
    name: "Streptococcal pharyngitis",
    location: "Sutton, WV, United States",
    coords: [7.159467,  -66.245689],
    time: new Date()
   },
   {
    name: "Poliomyelitis",
    location: "West Yorkshire, United Kingdom",
    coords: [53.7,  -1.583333],
    time: new Date()
   }
  ];
});
