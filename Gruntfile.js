'use strict';

module.exports = function (grunt) {

// Project configuration.
    grunt.config.init({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: 'dist'
        },

        concat: {
            vendor: {
                src: [
                    'vendor/jquery/jquery-1.12.0.min.js',
                    'vendor/bootstrap/bootstrap.js',
                    'vendor/bootbox.min.js',
                    'vendor/jqPaginator.min.js',
                    'vendor/mustache.min.js',
                    'js/jquery-extend.js',
                    'vendor/datepicker/bootstrap-datepicker.js',
                    'vendor/datepicker/bootstrap-datepicker.zh-CN.min.js'
                ],
                dest: 'tmp/vendor.debug.js'
            }
        },

        uglify: {
            vendor: {
                src: 'tmp/vendor.debug.js',
                dest: 'dist/js/vendor.min.js'
            },
            login: {
                src: 'js/login.js',
                dest: 'dist/js/login.min.js'
            },
            index: {
                src: 'js/index.js',
                dest: 'dist/js/index.min.js'
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
                src: ['upload_htzl.html', 'upload_spzl.html', 'login.html', 'index.html'],
                dest: 'dist/',
                options: {
                    relative: true,
                    styles: {
                        'bootstrap_css': [
                            'dist/css/bootstrap.min.css'
                        ],
                        'index_css': [
                            'dist/css/index.min.css'
                        ],
                    },
                    scripts: {
                        vendor_js: [
                            'dist/js/vendor.min.js',
                        ],
                        index_js: 'dist/js/index.min.js',
                        login_js: 'dist/js/login.min.js'
                    },
                }
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'cssmin', 'htmlbuild'])


}