'use strict';

module.exports = function (grunt) {

// Project configuration.
    grunt.config.init({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: 'dist'
        },

        concat: {
            vender: {
                src: [
                    'vendor/jquery/jquery-1.12.0.min.js',
                    'vendor/bootstrap/bootstrap.js',
                    'vendor/bootbox.min.js',
                    'vendor/jqPaginator.min.js',
                    'vendor/mustache.min.js'
                ],
                dest: 'dist/js/vendor.debug.js'
            }
        },

        uglify: {
            vender: {
                src: 'dist/js/vendor.debug.js',
                dest: 'dist/js/vendor.min.js'
            }
        },

        cssmin: {
            bootstrap: {
                src: ['vendor/bootstrap/bootstrap.css'],
                dest: 'dist/css/bootstrap.min.css'
            },
            index: {
                src: ['css/index.css'],
                dest: 'dist/css/index.min.css'
            }
        },

        htmlbuild: {
            dist: {
                src: 'index.html',
                dest: 'dist/',
                options: {
                    //beautify: true,
                    //prefix: '//some-cdn',
                    relative: true,
                    //scripts: {
                    //    bundle: [
                    //        '<%= fixturesPath %>/scripts/*.js',
                    //        '!**/main.js',
                    //    ],
                    //    main: '<%= fixturesPath %>/scripts/main.js'
                    //},
                    styles: {
                        'bootstrap_css': [
                            'dist/css/bootstrap.min.css'
                        ],
                        'index_css': 'dist/css/index.min.css'
                    },
                    //sections: {
                    //    views: '<%= fixturesPath %>/views/**/*.html',
                    //    templates: '<%= fixturesPath %>/templates/**/*.html',
                    //    layout: {
                    //        header: '<%= fixturesPath %>/layout/header.html',
                    //        footer: '<%= fixturesPath %>/layout/footer.html'
                    //    }
                    //},
                    //data: {
                    //    // Data to pass to templates
                    //    version: "0.1.0",
                    //    title: "test",
                    //},
                }
            }
        }
        //
        //watch: {
        //    js: {
        //        files: ['<%= srcPath%>/*.js'],
        //        tasks: ['depconcat', 'uglify']
        //    },
        //    css: {
        //        files: ['<%= assetsPath%>/*.less'],
        //        tasks: ['less', 'cssmin']
        //    }
        //}
    });

// grunt plugins
//    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
//    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html-build');


// Default grunt
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'cssmin','htmlbuild'])


}