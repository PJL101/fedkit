module.exports = function(grunt) {

  'use strict';

  // Time grunt tasks
  require('time-grunt')(grunt);

  // Load all grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    // Read needed files
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('_config.yml'),

    // Clean files
    clean: {
      dist: [
        '<%= site.dist %>',
      ],
      bower: [
        'bower_components',
        'bower_filtered',
        '<%= site.srcAssets %>/scss/vendor/bower',
        '<%= site.srcAssets %>/js/vendor/bower',
      ]
    },

    // Copy files
    copy: {
      bower: {
        files: [{
          expand: true,
          cwd: 'bower_filtered',
          src: ['**/*'],
          dest: '<%= site.srcAssets %>'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= site.srcAssets %>/fonts/',
          src: ['**/*'],
          dest: '<%= site.distAssets %>/fonts/'
        }]
      },
      files: {
        files: [{
          expand: true,
          cwd: '<%= site.src %>/files/',
          src: ['**/*'],
          dest: '<%= site.dist %>/'
        }]
      },
    },

    // Run shell tasks
    shell: {
      bower: {
        command: 'bower-installer'
      }
    },

    // Compile SASS
    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= site.srcAssets %>/scss/',
          src: ['**/*.scss'],
          dest: '<%= site.distAssets %>/css',
          ext: '.css'
        }],
        options: {
          sourceComments: false,
          sourceMap: true,
          sourceMapContents: true,
          sourceMapEmbed: false
        }
      },
      prd: {
        files: [{
          expand: true,
          cwd: '<%= site.srcAssets %>/scss/',
          src: ['**/*.scss'],
          dest: '<%= site.distAssets %>/css',
          ext: '.css'
        }],
        options: {
          sourceComments: false,
          sourceMap: false,
          sourceMapContents: false,
          sourceMapEmbed: false
        }
      }
    },

    // Postcss functions
    postcss: {
      dev: {
        options: {
          map: true,
          processors: [
            require('postcss-color-rgba-fallback')(), // Add hex colour fallback
            require('postcss-opacity'), // IE8 opacity fallback
            require('autoprefixer-core')(), // add vendor prefixes
            require('css-mqpacker')(), // Combine media queries
          ],
        },
        src: '<%= site.distAssets %>/css/**/*.css',
      },
      prd: {
        options: {
          map: false,
          processors: [
            require('postcss-color-rgba-fallback')(), // Add hex colour fallback
            require('postcss-opacity'), // IE8 opacity fallback                  
            require('autoprefixer-core')(), // add vendor prefixes
            require('css-mqpacker')(), // Combine media queries
            require('cssnano')(), // minify stylesheet
          ],
        },
        src: '<%= site.distAssets %>/css/**/*.css',
      }
    },

    // Change to rem units
    px_to_rem: {
      dev: {
        files: [{
          expand: true,
          flatten: true,
          src: '<%= site.distAssets %>/css/*.css',
          dest: '<%= site.distAssets %>/css/'
        }],
        options: {
          fallback: true,
          fallback_existing_rem: true,
          map: true,
          ignore: ['content']
        }
      },
      prd: {
        files: [{
          expand: true,
          flatten: true,
          src: '<%= site.distAssets %>/css/*.css',
          dest: '<%= site.distAssets %>/css/'
        }],
        options: {
          fallback: true,
          fallback_existing_rem: true,
          map: false,
          ignore: ['content']
        }
      },
    },

    // JSHint modules
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        force: false
      },
      all: [
        '<%= site.gruntFile %>',
        '<%= site.srcAssets %>/js/global.js',
        '<%= site.srcAssets %>/js/modules/**/*.js',
        '<%= site.srcAssets %>/js/main.js',
      ]
    },

    // Modernizr
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= site.srcAssets %>/js/vendor/bower/modernizr-custom.js',
        extra: {
          "shiv" : false,
          "printshiv": false,
          "load": false,
          "mq": false,
          "cssclasses": true
        },
        uglify: false,
        files: {
          src: [
            '<%= site.srcAssets %>/js/modules/**/*.js',
            '<%= site.distAssets %>/css/**/*.css'
          ]
        }
      }
    },

    // Uglify Javascript
    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          preserveComments: 'all',
          beautify: true,
          sourceMap: true,
          sourceMapIncludeSources: true
        },
        files: {
          '<%= site.distAssets %>/js/head.js': ['<%= site.srcAssets %>/js/head/**/*.js'],
          '<%= site.distAssets %>/js/head-oldie.js': ['<%= site.srcAssets %>/js/head-oldie/**/*.js'],
          '<%= site.distAssets %>/js/site.js': [
            '<%= site.srcAssets %>/js/global.js',
            '<%= site.srcAssets %>/js/vendor/**/*.js',
            '<%= site.srcAssets %>/js/plugins/**/*.js',
            '<%= site.srcAssets %>/js/modules/**/*.js',
            '<%= site.srcAssets %>/js/main.js',
          ]
        }
      },
      prd: {
        options: {
          mangle: true,
          compress: true,
          beautify: false,
          preserveComments: 'some',
          sourceMap: false,
          sourceMapIncludeSources: false
        },
        files: {
          '<%= site.distAssets %>/js/head.js': ['<%= site.srcAssets %>/js/head/**/*.js'],
          '<%= site.distAssets %>/js/head-oldie.js': ['<%= site.srcAssets %>/js/head-oldie/**/*.js'],
          '<%= site.distAssets %>/js/site.js': [
            '<%= site.srcAssets %>/js/global.js',
            '<%= site.srcAssets %>/js/vendor/**/*.js',
            '<%= site.srcAssets %>/js/plugins/**/*.js',
            '<%= site.srcAssets %>/js/modules/**/*.js',
            '<%= site.srcAssets %>/js/main.js',
          ]
        }
      },
    },

    // Image minification
    imagemin: {
      dynamic: {
        options: {

        },
        files: [{
          expand: true,
          cwd: '<%= site.srcAssets %>/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= site.distAssets %>/img/'
        }]
      }
    },

    // HTML minification
    htmlmin: {
      prd: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= site.dist %>',
          src: ['**/*.html'],
          dest: '<%= site.dist %>',
        }]
      }
    },

    // Watch for changes
    watch: {
      js: {
        files: ['<%= site.srcAssets %>/js/**/*.js'],
        tasks: ['jshint', 'uglify:dev'],
      },
      scss: {
        files:['<%= site.srcAssets %>/scss/**/*.scss'],
        tasks:['sass:dev', 'postcss:dev', 'px_to_rem:dev'],
      },
      img: {
        files: ['<%= site.srcAssets %>/img/**/*.{png,jpg,gif}'],
        tasks: ['newer:imagemin'],
      },
      fonts: {
        files: ['<%= site.srcAssets %>/fonts/**/*'],
        tasks: ['newer:copy:fonts'],
      },
      files: {
        files: ['<%= site.src %>/files/**/*'],
        tasks: ['newer:copy:files'],
      },
    },

    // Bump task
    // Use by running: 'grunt bump:patch', 'grunt bump:minor', 'grunt bump:major'
    bump: {
        options: {
          files: ['package.json', 'README.md'],
          updateConfigs: [],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['package.json', 'README.md'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
          globalReplace: false,
          prereleaseName: false,
          regExp: false
        }
      },
  });

  // Tasks
  grunt.registerTask('dev', [
    'clean:dist',
    'shell:bower',
    'newer:copy:bower',
    'sass:dev',
    'postcss:dev',
    'px_to_rem:dev',
    'jshint',
    'modernizr',
    'uglify:dev',
    'imagemin',
    'copy:fonts',
    'copy:files',
    'watch'
  ]);

  grunt.registerTask('prd', [
    'clean:dist',
    'shell:bower',
    'newer:copy:bower',
    'sass:prd',
    'postcss:prd',
    'px_to_rem:prd',
    'jshint',
    'modernizr',
    'uglify:prd',
    'imagemin',
    'htmlmin:prd',
    'copy:fonts',
    'copy:files',
  ]);

  grunt.registerTask('default', 'dev');
  grunt.registerTask('reset', ['clean']);
};
