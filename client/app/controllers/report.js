angular.module('panacea.report', [])
.controller('ReportController', function($scope, $location, $window, Report) {
  $scope.report = {};
  $scope.diseases = [
    "African Trypanosomiasis", "Cholera", "Cryptosporidiosis", "Dengue", "Hepatitis A", "Hepatitis B", "Hepatitis C", 
    "HIV/AIDS", "Influenza", "Japanese Encephalitis", "Leishmaniasis", "Malaria", "Measles", "Meningitis", "Onchocerciasis",
    "Pneumonia", "Rotavirus", "Schistosomiasis", "Shigellosis", "Strep Throat", "Tuberculosis", "Typhoid", "Yellow Fever"
  ];
  
  $scope.getAddressFromCurrentPos = function() {
    // get latitude/longitude from current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        var geocoder = new google.maps.Geocoder(); 

        geocoder.geocode({'location': latlng}, function(results, status) {
          $scope.$apply(function() {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {  // if we received the full address
                $scope.report.incidence_city = results[0].address_components[2].long_name; 
                $scope.report.incidence_state = results[0].address_components[5].short_name; 
                $scope.report.incidence_zip = results[0].address_components[7].long_name;
                $scope.report.incidence_country = results[0].address_components[6].long_name;
              } else if (results[1]) {  // if we received just city, state, country
                $scope.report.incidence_city = results[1].address_components[0].long_name; 
                $scope.report.incidence_state = results[1].address_components[3].short_name; 
                $scope.report.incidence_country = results[1].address_components[4].long_name;
              } else if (results[6]) {  // if we received just state, country
                $scope.report.incidence_state = results[6].address_components[0].short_name; 
                $scope.report.incidence_country = results[6].address_components[1].long_name;
              } else if (results[7]) {  // if we received just country
                $scope.report.incidence_country = results[7].formatted_address;
              }
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
          });
        });
      });
    } else {
      throw new Error();
    }
  };

  $scope.submitReport = function() {   
    Report.prepReport($scope.report, Report.sendReport);
    $scope.report = {};
    $scope.reportForm.$setPristine();
    $scope.reportForm.$setUntouched();
    $scope.toggleReport();
  };

});  
