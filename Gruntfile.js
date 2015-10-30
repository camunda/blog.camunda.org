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
      commonsUiFonts: {
        files: [{
          cwd: 'node_modules/camunda-commons-ui/vendor/fonts/',
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
      }
    },

    less: {
      options: {
        dumpLineNumbers: 'all',
        paths: ['node_modules']
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
          src: ['node_modules/bpmn-js/lib/NavigatedViewer.js'],
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
        files: ['<%= setup.source %>/styles/**/*.less'],
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



  grunt.registerTask('import', function () {
    var jsonContent = grunt.file.readJSON('./camunda-blog-posts.json');
    var postTemplate = [
      '---',
      'title: "<%= title.split(\'\\"\').join(\'\\\\"\') %>"',
      'date: "<%= (new Date(published)).toISOString().split("T").shift() %>"',
      'author: "<%= author.displayName %>"',
      '',
      'categories:',
      '  - "<%= category %>"',
      'tags: <%= tags.map(function (tag) { return \'\\n  - "\'+ tag +\'"\'; }).join(\'\') %>',
      '',
      'aliases:',
      '  - "<%= alias %>"',
      '',
      '---',
      '',
      '<div>',
      '<%= content %>',
      '</div>'
    ].join('\n');

    jsonContent.items.forEach(function (post) {
      var nameParts = post.url.split('/');
      var name = 'content/post/' + nameParts[3] + '/' + nameParts[4] + '/' + nameParts[5].split('.html')[0] + '.md';

      post.tags = [];
      if (post.title.toLowerCase().indexOf('release') > -1) {
        post.tags.push('Release Note');
      }

      post.category = 'Execution';
      if (post.title.toLowerCase().indexOf('community') > -1) {
        post.category = 'Community';
      }
      else if (post.title.toLowerCase().indexOf('bpmn.io') > -1 ||
               post.title.toLowerCase().indexOf('dmn.io') > -1) {
        post.category = 'Modeling';
      }

      post.labels = post.labels || [];
      post.alias = post.url.split('blog.camunda.org').pop();

      post.content
        .split('href="http://blog.camunda.org/')
        .join('href="/')
        .split('href="http://camundabpm.blogspot.de/')
        .join('href="/')
      ;

      grunt.file.write(name, grunt.template.process(postTemplate, {data: post}));
    });

  });



  grunt.registerTask('build', ['copy', 'less:styles', 'browserify']);

  grunt.registerTask('optimize', [
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('default', ['build', 'watch']);
};
