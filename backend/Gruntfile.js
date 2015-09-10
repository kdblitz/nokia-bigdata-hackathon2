'use strict';

module.exports = function(grunt) {
  var serveStatic = require('serve-static');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        hostname: 'localhost'
      },
      development: {
        options: {
          middleware: function(connect) {
            return [
              serveStatic('../frontend')
            ];
          }
        }
      }
    },
    watch: {
      options: {
        livereload: '<%= connect.options.livereload %>',
      },
      html: {
        files: ['../frontend/*.html']
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['connect:development','watch']);
}
