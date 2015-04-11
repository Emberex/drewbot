module.exports = function(grunt) {
  
  require('jit-grunt')(grunt, {
    ngtemplates: 'grunt-angular-templates'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: { }
    },
    jshint: {
      files: ['Gruntfile.js', 'frontend/src/**/*.js', 'app.js', 'routes/**/*.js']      
    },
    nodemon: {
      dev: {
        script: 'bin/www',
        options: {
          watch: ['app.js', 'bin', 'routes', 'views']
        }
      }
    },
    watch: {
      frontend: {
        files: ['frontend/src/**/*'],
        tasks: ['jshint', 'deployFrontEnd']
      },
      backend: {
        files: ['app.js', 'routes/**/*'],
        tasks: ['jshint']
      }
    },
    concat: {
      dist: {
        src: ['frontend/src/drewbotClient.js', 'frontend/src/*.js', 'frontend/src/**/*.js', 'drewbotClient-templates.js'],
        dest: 'public/javascripts/drewbotClient.js',
      },
    },
    ngtemplates:  {
      "em-drewbot": {
        cwd: 'frontend/src',
        src: '**.html',
        dest: 'drewbotClient-templates.js'
      }
    },
    copy: {
      lib: {
        files: [{
            expand: true,
            flatten: false,
            cwd: 'lib',
            src: [
                'angular/angular.js',
                'angular/angular.min.js',
                'angular/angular.min.js.map',
                'underscore/underscore.js'
            ],
            dest: 'public/lib'
        }]
      }
    },
    concurrent: {
        watchers: ['nodemon', 'watch:frontend', 'watch:backend'],
        options: {
          logConcurrentOutput: true
        }
    }
  });

  grunt.registerTask('deployFrontEnd', ['ngtemplates', 'concat']);
  grunt.registerTask('build', ['jshint', 'deployFrontEnd']);
  grunt.registerTask('compile', ['bower', 'copy:lib', 'build']);
  grunt.registerTask('start', ['build', 'concurrent:watchers']);

};