module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var to5ify = require("6to5ify");

  var rewrite = require('connect-modrewrite');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      all: {
        tasks: ['browserify','watch','preview'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    connect: {
      preview: {
        options: {
          port: 9000,
          keepalive: true,
          base: './dist',
          hostname: 'localhost',

          // http://danburzo.ro/grunt/chapters/server/
          middleware: function(connect, options) {

            var middleware = [];

            // 1. mod-rewrite behavior
            var rules = [
            '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
            ];
            middleware.push(rewrite(rules));

            // 2. original middleware behavior
            var base = options.base;
            if (!Array.isArray(base)) {
              base = [base];
            }
            base.forEach(function(path) {
              middleware.push(connect.static(path));
            });

            return middleware;

          }

        }
      }
    },
    watch: {
      js: {
        options: {
          livereload: false
        },
        files: ['src/js/**/*.es6','src/js/**/*.js','src/js/**/*.jsx'],
        tasks: ['browserify']
      },
      sass: {
        options: {
          livereload: false
        },
        files: ['src/scss/**/*.scss'],
        tasks: ['sass']
      }
    },
    sass: {
      dist: {
        files: {
          'dist/css/bundle.css': 'src/scss/main.scss',
        },
        options: {
          style: 'compressed'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/js/bundle.js': ['src/js/**/*.{es6,js,jsx}'],
        },
        options: {
          browserifyOptions: {
            debug: true,
            extensions: ['.es6','.jsx','.js']
          },
          transform: [to5ify]
        }
      }
    }
  });

grunt.registerTask('preview', [], function () {

  // load plugins for the task
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // execute the task
  grunt.task.run(
    'connect:preview'
    );

});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-concurrent');

grunt.registerTask("default", ["concurrent:all"]);
};