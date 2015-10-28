angular.module('panacea.report', [])
.controller('ReportController', function($scope, $location, Report) {
  $scope.report = {};
  $scope.report.date = new Date();

  $scope.createReport = function() {
    Report.sendReport($scope.report)
      .then($location.path('/globe'))
      .catch(function(error) {
        console.log(error);
      });
  };

});
