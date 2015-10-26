var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('the Panacea app client', function() {
  describe('Routing', function() {
    var $route;
    beforeEach(module('panacea')); // beforeEach runs before each test in block

    beforeEach(inject(function($injector){
      $route = $injector.get('$route'); // retrieve instance of route
    }));

    it('Should have /map route, template, and controller', function () {
      expect($route.routes['/map']).to.be.ok();
      expect($route.routes['/map'].controller).to.be('MapController');
      expect($route.routes['/map'].templateUrl).to.be('app/map/map.html');
    });

    it('Should have /globe route, template, and controller', function () {
      expect($route.routes['/globe']).to.be.ok();
      expect($route.routes['/globe'].controller).to.be('GlobeController');
      expect($route.routes['/globe'].templateUrl).to.be('app/globe/globe.html');
    });

    it('Should have /form route, template, and controller', function () {
      expect($route.routes['/form']).to.be.ok();
      expect($route.routes['/form'].controller).to.be('FormController');
      expect($route.routes['/form'].templateUrl).to.be('app/form/form.html');
    });
  });
});
