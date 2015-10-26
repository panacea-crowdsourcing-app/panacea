module.exports = function(config) {
  config.set({
    basePath: './',

    frameworks: [
      'mocha', 'chai'
    ],

    // list of files / patterns to load in the browser
    files: require('./include.conf.js').concat([
      'client/lib/angular/angular.js',
      'client/lib/angular-route/angular-route.js',
      'client/lib/angular-aria/angular-aria.js',
      'client/lib/angular-animate/angular-animate.js',
      'client/lib/angular-material/angular-material.js',
      'client/app/services/services.js',
      'client/app/map/map.js',
      'client/app/globe/globe.js',
      'client/app/app.js',
      'test/unit/clientRoutingSpecs.js'//,
      //'test/integration/**/*.js'
    ]),

    exclude: [
      'karma.conf.js'
    ],

    // progress reporter: lists each test run and whether they pass/fail
    // coverage reporter: creates coverage reports for every tested browser
    reporters: ['progress', 'coverage'],

    // Karma web server port
    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: [
      'Chrome'
    ],

    preprocessors: {
      // Source files you want to generate coverage reports for
      // This should not include tests or libraries
      // These files will be instrumented by Istanbul
      'client/app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'html',
      dir: 'results/coverage/'
    },

    captureTimeout: 20000,

    singleRun: false,

    reportSlowerThan: 500,

    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
 
      'karma-chrome-launcher'
    ]
  });
};
