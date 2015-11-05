angular.module('panacea.services', [])
.factory('Report', function($http, $rootScope, $location) {
  var prepReport = function(report, callback) {
    // add date and source type to report
    report.time = new Date();
    report.source_type = 'web form';
    // determine how non-required address inputs will be included in address based on whether they were filled out
    var street = report.incidence_address ? report.incidence_address + ', ' : '';
    var region = report.incidence_state ? report.incidence_state + ', ' : '';

    // var zipcode = report.incidence_zip ? report.incidence_zip + ', ' : '';

    // add latitude and longitude to report
    var geocoder = new google.maps.Geocoder();
    var address = street + report.incidence_city + ", " + region + report.incidence_country;
    report.location = address;

    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        report.coords = [latitude, longitude];
        callback(report);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  var sendReport = function(report) {
    // return $http({
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    //   url: '/api/reports',
    //   data: report
    // });
    $rootScope.showSimpleToast();
    // NEED TO DELETE: new data gets added to $rootScope.data to see
    $rootScope.data.push(report);

    // Some kind of root function needs to be called to updated the data being
    // used for the Google Map
    $rootScope.update(report);
    // Some kind of root function needs to be called to updated the data being
    // used for the feed
    $rootScope.updateFeed();
    console.log(report);
  };

  return {
    prepReport: prepReport,
    sendReport: sendReport
  };
});