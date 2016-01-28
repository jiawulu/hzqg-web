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


        //cssmin: {
        //    combine: {
        //        files: {
        //            "<%= distPath %>/sku_1x.css": "<%= distPath %>/sku_1x.debug.css",
        //            "<%= distPath %>/sku_2x.css": "<%= distPath %>/sku_2x.debug.css"
        //        }
        //    }
        //},
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


// Default grunt
    grunt.registerTask('default', ['clean', 'concat', 'uglify'])

}