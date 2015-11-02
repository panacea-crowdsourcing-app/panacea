angular.module('panacea.globe', [])
.controller('GlobeController', function($scope, $rootScope, $location, $http) {

  // var globeData;
  // $http({
  //         method: 'GET',
  //         url: '/api/globe'
  // })
  // .then(function(resp) {
  //   globeData = resp;
  // });

  var sens = 0.25,
  focused;

  //SVG container
  var svg = d3.select(".svg-container").append("svg")
  .call(d3.behavior.drag()
    .origin(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
    .on("drag", function() {
      var rotate = projection.rotate();
      projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
      svg.selectAll("path.land").attr("d", path);
      svg.selectAll("path.cities").attr("d", path);
      svg.selectAll(".focused").classed("focused", focused = false);
    }));

  var width = $('.svg-container').width() /4 * 0.8;

  //Setting projection
  var projection = d3.geo.orthographic()
  .scale(width)
  .rotate([0, 0])
  // .translate([$('#globe').width() / 4, $('#globe').width() / 4])
  .clipAngle(90);

  var path = d3.geo.path()
  .projection(projection);

  //Adding water
  svg.append("path")
  .datum({type: "Sphere"})
  .attr("class", "water")
  .attr("d", path);

  var countryTooltip = d3.select("#globe-view-container").append("div").attr("class", "countryTooltip"),
  // countryList = d3.select("#dropdown").append("select").attr("name", "countries");
  countryList = d3.select("md-select");


  queue()
  .defer(d3.json, "app/globe/world-110m.json")
  .defer(d3.tsv, "app/globe/world-110m-country-names.tsv")
  .await(ready);

  //Main function
  function ready(error, earth, countryData) { // if breaks, change "earth" back to world

    $scope.countryById = {};
    var countries = topojson.feature(earth, earth.objects.countries).features; // if breaks, change "earth" back to world

    //Adding countries to select
    countryData.forEach(function(d) {
      $scope.countryById[d.id] = [d.name, d.lat, d.lng, d.id];
      $scope.$apply("countryById");
    });

    //Drawing countries on the globe
    var world = svg.selectAll("path.land")
    .data(countries)
    .enter().append("path")
    .attr("class", "land")
    .attr("d", path)

    //Mouse events
    .on("mouseover", function(d) {
      countryTooltip.text("Click to view " + $scope.countryById[d.id][0] + " on the map.")
      .style("left", (d3.event.pageX + 7) + "px")
      .style("top", (d3.event.pageY - 15) + "px")
      .style("display", "block")
      .style("opacity", 1);
    })
    .on("mouseout", function(d) {
      countryTooltip.style("opacity", 0)
      .style("display", "none");
    })
    .on("mousemove", function(d) {
      countryTooltip.style("left", (d3.event.pageX + 7) + "px")
      .style("top", (d3.event.pageY - 15) + "px");
    })
    .on("click", function(d) {
      if (d3.event.defaultPrevented) return;
      $rootScope.$apply(function() {
        $rootScope.center = {
          lat: Number($scope.countryById[d.id][1]),
          lng: Number($scope.countryById[d.id][2])
        };
        $location.path("map");
      });
    });

    var rScale = d3.scale.sqrt();
    var peoplePerPixel = 50000;
    var max_population = [];

    // loading city locations from geoJSON
    d3.json("app/globe/geonames_cities_100k.geojson", function(error, data) {

             // Handle errors getting and parsing the data
             if (error) { return error; }

             // filter data set to only include cities with population greater than or equal to 800k
             var cities = [];
             for (var i = 0; i < data.features.length; i++) {
              if (data.features[i].properties.population >= 800000) {
                cities.push(data.features[i]);
              }
             }

             // setting the circle size (not radius!) according to the number of inhabitants per city
             population_array = [];
             for (i = 0; i < data.features.length; i++) {
                population_array.push(data.features[i].properties.population);
             }
             max_population = population_array.sort(d3.descending)[0];
             var rMin = 0;
             var rMax = Math.sqrt(max_population / (peoplePerPixel * Math.PI));
             rScale.domain([0, max_population]);
             rScale.range([rMin, rMax]);

             path.pointRadius(function(d) {
                return d.properties ? rScale(d.properties.population) : 1;
             });

             // Drawing transparent circle markers for cities
             svg.selectAll("path.cities").data(cities)
                .enter().append("path")
                .attr("class", "cities")
                .attr("d", path)
                .attr("fill", "#ff0000")
                .attr("fill-opacity", 0.4);
    });

    //Country focus on option select
    $scope.rotate = function () {
        var rotate = projection.rotate(),
        focusedCountry = country(countries, $scope.userChoice),
        p = d3.geo.centroid(focusedCountry);

        console.log(focusedCountry);
        console.log(p);

        svg.selectAll(".focused").classed("focused", focused = false);

      //Globe rotating
      (function transition() {
        d3.transition()
        .duration(2500)
        .tween("rotate", function() {
          var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
          return function(t) {
            projection.rotate(r(t));
            svg.selectAll("path").attr("d", path)
            .classed("focused", function(d, i) { return d.id == focusedCountry.id ? focused = d : false; });
          };
        });
        })();
    };

    function country(cnt, sel) {
      for(var i = 0, l = cnt.length; i < l; i++) {
        if(cnt[i].id == sel[3]) {return cnt[i];}
      }
    }

  }
});
