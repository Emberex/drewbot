module.exports = function(grunt) {
  
  require('jit-grunt')(grunt, {
    ngtemplates: 'grunt-angular-templates',
    bower: 'grunt-bower-task'

  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      frontend: {
        src: "frontend/src"
      },
      backend: {

      }
    },
    bower: {
      install: { }
    },
    jshint: {
      files: ['Gruntfile.js', '<%= dirs.frontend.src %>/**/*.js', 'app.js', 'routes/**/*.js']      
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
        files: ['<%= dirs.frontend.src %>/**/*'],
        tasks: ['jshint', 'deployFrontEnd']
      },
      backend: {
        files: ['app.js', 'routes/**/*'],
        tasks: ['jshint']
      }
    },
    concat: {
      dist: {
        src: ['<%= dirs.frontend.src %>/drewbotClient.js', '<%= dirs.frontend.src %>/*.js', '<%= dirs.frontend.src %>/**/*.js', 'frontend/drewbotClient-templates.js'],
        dest: 'public/javascripts/drewbotClient.js',
      },
    },
    ngtemplates:  {
      "em-drewbot": {
        cwd: '<%= dirs.frontend.src %>',
        src: '**.html',
        dest: 'frontend/drewbotClient-templates.js'
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
    },
    clean: ["frontend/drewbotClient-templates.js"]
  });

  grunt.registerTask('deployFrontEnd', ['ngtemplates', 'concat']);
  grunt.registerTask('build', ['jshint', 'deployFrontEnd']);
  grunt.registerTask('compile', ['bower', 'copy:lib', 'build']);
  grunt.registerTask('start', ['build', 'concurrent:watchers']);

};