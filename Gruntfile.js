'use strict';
/*jshint node:true*/
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  var setup = grunt.file.readJSON(__dirname + '/package.json').setup;

  grunt.initConfig({
    setup: setup,

    copy: {
      themeInfo: {
        files: [{
          expand: true,
          cwd: '<%= setup.source %>/',
          src: ['theme.toml'],
          dest: '<%= setup.target %>/'
        }]
      },
      bootstrapFonts: {
        files: [{
          cwd: 'node_modules/camunda-commons-ui/node_modules/bootstrap/fonts/',
          expand: true,
          src: ['**/*'],
          dest: '<%= setup.target %>/static/fonts/'
        }]
      },
      bpmnFonts: {
        files: [{
          cwd: 'node_modules/camunda-commons-ui/node_modules/bpmn-font/dist/font/',
          expand: true,
          src: ['**/*'],
          dest: '<%= setup.target %>/static/fonts/'
        }]
      },
      ibmplexsansFonts: {
        files: [{
          cwd: 'theme-src/static/fonts/',
          expand: true,
          src: ['**/*'],
          dest: '<%= setup.target %>/static/fonts/'
        }]
      },
      layouts: {
        files: [{
          cwd: '<%= setup.source %>/layouts/',
          expand: true,
          src: ['**/*'],
          dest: '<%= setup.target %>/layouts/'
        }]
      },
      static: {
        files: [{
          cwd: '<%= setup.source %>/static/',
          expand: true,
          src: ['**/*'],
          dest: '<%= setup.target %>/static/'
        }]
      },
      archetypes: {
        files: [{
          cwd: '<%= setup.source %>/archetypes/',
          expand: true,
          src: ['**/*'],
          dest: '<%= setup.target %>/archetypes/'
        }]
      }
    },

    less: {
      options: {
        dumpLineNumbers: 'comments',
        compress: false,
        sourceMap: false,
        paths: [
          'node_modules',
          'node_modules/camunda-commons-ui/node_modules/'
        ]
      },
      styles: {
        files: [{
          src: ['<%= setup.source %>/styles/styles.less'],
          dest: '<%= setup.target %>/static/css/styles.css'
        }]
      }
    },

    browserify: {
      scripts: {
        files: [{
          src: ['<%= setup.source %>/scripts/index.js'],
          dest: '<%= setup.target %>/static/js/scripts.js'
        }]
      },

      bpmnJs: {
        options: {
          browserifyOptions: {
            standalone: 'BPMNViewer'
          }
        },
        files: [{
          src: ['node_modules/camunda-commons-ui/node_modules/bpmn-js/lib/NavigatedViewer.js'],
          dest: '<%= setup.target %>/static/js/bpmn-viewer.js'
        }]
      }
    },

    watch: {
      layouts: {
        files: ['<%= setup.source %>/layouts/**/*'],
        tasks: ['copy:layouts']
      },
      styles: {
        files: [
          'node_modules/camunda-commons-ui/lib/**/*.less',
          'node_modules/camunda-commons-ui/resources/less/**/*.less',
          '<%= setup.source %>/styles/**/*.less'
        ],
        tasks: ['less:styles']
      },
      scripts: {
        files: ['<%= setup.source %>/scripts/**/*.js'],
        tasks: ['browserify:scripts']
      }
    },

    cssmin: {
      styles: {
        files: [{
          src: '<%= setup.target %>/static/css/styles.css',
          dest: '<%= setup.target %>/static/css/styles.css'
        }]
      }
    },

    uglify: {
      scripts: {
        files: [{
          src: '<%= setup.target %>/static/js/scripts.js',
          dest: '<%= setup.target %>/static/js/scripts.js'
        },
        {
          src: '<%= setup.target %>/static/js/bpmn-viewer.js',
          dest: '<%= setup.target %>/static/js/bpmn-viewer.js'
        }]
      }
    }
  });




  grunt.registerTask('build', ['copy', 'less:styles', 'browserify']);

  grunt.registerTask('optimize', [
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('default', ['build', 'watch']);
};
