module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var to5ify = require("6to5ify");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        options: {
          livereload: true
        },
        files: ['src/js/**/*.es6','src/js/**/*.js','src/js/**/*.jsx'],
        tasks: ['browserify']
      },
      sass: {
        options: {
          livereload: true
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

  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask("default", ["browserify", "watch"]);
};