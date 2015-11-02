angular.module('panacea.report', [])
.controller('ReportController', function($scope, $location, Report) {
  $scope.report = {};
  $scope.report.date = new Date();
  $scope.diseases = [
    "African Trypanosomiasis", "Cholera", "Cryptosporidiosis", "Dengue", "Hepatitis A", "Hepatitis B", "Hepatitis C", 
    "HIV/AIDS", "Influenza", "Japanese Encephalitis", "Leishmaniasis", "Malaria", "Measles", "Meningitis", "Onchocerciasis",
    "Pneumonia", "Rotavirus", "Schistosomiasis", "Shigellosis", "Strep Throat", "Tuberculosis", "Typhoid", "Yellow Fever"
  ];

  // get latitude/longitude from current position
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     $scope.report.latitude = position.coords.latitude;
  //     $scope.report.longitude = position.coords.longitude;
  //   });
  // } else {
  //   throw new Error();
  // }   

  $scope.createReport = function() {   
    Report.getCoordsFromAddress($scope.report, Report.sendReport);
    // code below is temporary and will be refactored
    $scope.report = {};
    $scope.report.date = new Date();
    $scope.reportForm.$setPristine();
    $scope.reportForm.$setUntouched();
    $scope.toggleSide();
  };

});  
