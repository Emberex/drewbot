module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task');
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
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
            dest: 'public/javascripts'
        }]
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'copy']);
  grunt.registerTask('dist', ['jshint', 'bower', 'copy']);

};