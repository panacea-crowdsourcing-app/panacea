module.exports = function(grunt) {
  // load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-mocha');


  // concatenation order
  var clientIncludeOrder = require('./include.conf.js');

  // project configuration
  grunt.initConfig({
    //tasks
    pkg: grunt.file.readJSON('package.json'), 

    clean: {
      dist: 'dist/*',
      results: 'results/*'
    },

    jshint: {
      gruntfile: 'Gruntfile.js',
      client: clientIncludeOrder,
      server: './server.js',
      options: {
        globals: {
          eqeqeq: true 
        },
        laxcomma: true
      }
    },

    uglify: {
      panacea: {
        files: {
          'dist/client/scripts/panacea.js': clientIncludeOrder
        }
      }
    },

    copy: {
      client: {
        // Copy everything except for the js files getting concatenated
        src: ['client/**', 
          '!client/app/services/services.js',
          '!client/app/map/map.js',
          '!client/app/globe/globe.js',
          '!client/app/app.js'
        ],
        dest: 'dist/'
      },

      server: {
        src: ['server/**', 
          './server.js', 
          '!server/api_key.txt', 
          '!server/geocoder.js',
          '!server/twitterKeys.js',
          '!server/yandexKey.js',
          '!server/database/dbLogin.js'
        ],
        dest: 'dist/'
      }
    },

    concat: {
      panacea: {
        files: {
          'dist/client/scripts/panacea.js': clientIncludeOrder
        }
      }
    },

    express: {
      dev: { // use express:dev to start the server
        options: {
          script: 'dist/server.js'
        }
      }
    },

    karma: {
      options: { // share common config settings between multiple targets
        configFile: 'karma.conf.js',
        reporters: ['progress', 'coverage'] // reporters listen to test runner events and visualize results of test runs
      },
      watch: {
        background: true, // run karma in child process so it doesn't block subsequent tasks
        reporters: ['progress']
      },
      // single-run configuration for development
      single: {
        singleRun: true,
      },
      // single-run configuration for continuous integration
      ci: {
        singleRun: true,
        coverageReporter: { // configure the reporter
          type: 'lcov', // graphical front-end for coverage testing tool
          dir: 'results/coverage/'
        }
      }
    },

    // configure casperjs
    // casperjs: {
    //   options: {},
    //   e2e: {
    //     files: {
    //       'results/casper': 'test/e2e/**/*.js'
    //     }
    //   }
    // },

    // watch for changes and then run tasks
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      client: {
        files: ['client/**'],
        tasks: ['build', 'karma:watch:run'] // add 'casperjs' 
      },
      server: {
        files: ['./server.js'],
        tasks: ['build', 'express:dev'], // add 'casperjs' 
        options: {
          spawn: false // restart server
        }
      },
      unitTests: {
        files: ['test/unit/**/*.js'],
        tasks: ['karma:watch:run']
      }//,
      // integrationTests: {
      //   files: [ 'test/integration/**/*.js' ],
      //   tasks: [ 'karma:watch:run' ]
      // },
      // e2eTests: {
      //   files: [ 'test/e2e/**/*.js' ],
      //   tasks: [ 'casperjs' ]
      // }
    }
  });

  grunt.registerTask('build', ['jshint', 'clean', 'copy', 'concat', 'uglify']);

  // grunt.registerTask('teste2e', [ 'express:dev', 'casperjs' ]);

  grunt.registerTask('testClient', ['karma:single']);

  grunt.registerTask('test', ['testClient']); // add 'teste2e'

  // grunt.registerTask('ci', [ 'karma:ci', 'express:dev', 'casperjs' ]);

  grunt.registerTask('default', ['build', 'express:dev', 'karma:watch:start', 'watch']);
};
