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
        }]
      }
    }
  });



  grunt.registerTask('import', function () {
    var jsonContent = grunt.file.readJSON('./camunda-blog-posts.json');
    var postTemplate = [
      '---',
      // '',
      'title: "<%= title.split(\'\\"\').join(\'\\\\"\') %>"',
      'date: "<%= published %>"',
      'author: "<%= author.displayName %>"',
      '',
      'categories:',
      '  - "<%= category %>"',
      'tags: <%= labels.map(function (tag) { return \'\\n  - "\'+ tag +\'"\'; }).join(\'\') %>',
      '',
      'aliases:',
      '  - "<%= alias %>"',
      '',
      '---',
      '',
      '<%= content %>'
    ].join('\n');

    var weight = jsonContent.items.length;
    jsonContent.items.forEach(function (post) {
      var nameParts = post.url.split('/');
      var name = 'content/post/' + nameParts[3] + '/' + nameParts[4] + '/' + nameParts[5].split('.html')[0] + '.md';
      // post.year = (new Date(post.published)).getFullYear();
      // post.weight = weight;

      post.category = post.title.toLowerCase().indexOf('release') < 0 ? 'Development' : 'Release';
      post.labels = post.labels || [];
      post.alias = post.url.split('blog.camunda.org').pop();

      grunt.file.write(name, grunt.template.process(postTemplate, {data: post}));
      weight--;
    });

  });



  grunt.registerTask('build', ['copy', 'less:styles', 'browserify:scripts']);

  grunt.registerTask('optimize', [
    'uglify:scripts',
    'cssmin:styles'
  ]);

  grunt.registerTask('default', ['build', 'watch']);
};
