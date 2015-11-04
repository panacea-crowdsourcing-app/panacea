angular.module('panacea.services', [])
.factory('Report', function($http, $location) {
  var prepReport = function(report, callback) {
    // add date and source type to report
    report.date = new Date();
    report.source_type = 'web form';
    // determine how non-required address inputs will be included in address based on whether they were filled out
    var street = report.incidence_address ? report.incidence_address + ', ' : '';
    var region = report.incidence_state ? report.incidence_state + ', ' : '';
    var zipcode = report.incidence_zip ? report.incidence_zip + ', ' : '';
    // add latitude and longitude to report
    var geocoder = new google.maps.Geocoder();
    var address = street + report.incidence_city + ", " + region + zipcode + report.incidence_country;

    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        report.latitude = results[0].geometry.location.lat();
        report.longitude = results[0].geometry.location.lng();
        callback(report);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  var sendReport = function(report) {
    return $http({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: '/api/reports',
      data: report
    });
  };

  return {
    prepReport: prepReport,
    sendReport: sendReport
  };
});