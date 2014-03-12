/* global module */

module.exports = function(grunt) {
  "use strict";
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    app: {
      dev: 'dev',
      dist: 'dist'
    },

    watch: {
      options: {
        nospawn: false
      },
      styles: {
        files: ['<%= app.dev %>/styles/*.less'],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= app.dev %>/*.html',
          '<%= app.dev %>/scripts/*.js',
          '<%= app.dev %>/styles/*.css'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // hostname: '192.168.0.192'
        hostname: null
      },
      livereload: {
        options: {
          // open: true,
          base: '<%= app.dev %>'
        }
      }
    },

    bowerInstall: {
      target: {
        src: ['<%= app.dev %>/index.html']
      }
    },

    less: {
      options: {
        files: []
      },
      dev: {
        files: {
          '<%= app.dev %>/styles/main.css': '<%= app.dev %>/styles/*.less',
        }
      },
      dist: {
        files: {
          '<%= app.dist %>/styles/main.css': '<%= app.dev %>/styles/*.less',
        }
      }
    },

    autoprefixer: {
      options: {},
      dev: {
        src: '<%= app.dev %>/styles/main.css'
      },
      dist: {
        src: '<%= app.dist %>/styles/main.css'
      }
    },

    copy: {
      build: {
        cwd: '<%= app.dev %>',
        src: ['**', '!**/*.less', '!**/*.css'],
        dest: '<%= app.dist %>',
        expand: true
      }
    },

    clean: {
      dev: {},
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= app.dist %>'
          ]
        }]
      },
    },

    uglify: {
      build: {
        options: {
          mangle: true
        },
        files: [{
          expand: true,
          cwd: '<% app.dist %>',
          src: '**/*.js',
          dest: '<%= app.dist %>/scripts'
        }]
      }
    },

    useminPrepare: {
      options: {
        dest: '<%= app.dist %>'
      },
      html: '<%= app.dist %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%= app.dist %>']
      },
      html: ['<%= app.dist %>/*.html'],
      css: ['<%= app.dist %>/styles/*.css']
    }
  });

  grunt.registerTask('server', [
    'less:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('dev', [
    'less:dev',
    'autoprefixer:dev'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'copy:build',
    'less:dist',
    'autoprefixer:dist',
    'uglify',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);
};