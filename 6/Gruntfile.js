module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        // eza  task
        uglify: {
            options: {
                banner: '/*!  <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['js/main.js', 'js/angular-route.min.js.js', 'js/controllers/*.js'],
                dest: 'build/js/app.min.js'
            }
        },
        copy: {
            main: {
                files: [
      // includes files within path 
                    {
                        expand: true,
                        src: ['templates/**', 'bower_components/**', 'json/**', 'dist/**'],
                        dest: 'build/',
                    },
                    {
                        expand: true,
                        src: ['index.html'],
                        dest: 'build/'
                            // filter: 'isFile'
                    }
               ],
                options: {
                    process: function (content, srcpath) {
                        if (srcpath === 'index.html') {
                            var reg = /\r?\n|\r/g;
                            content = content.replace(reg, "");
                            content2 = content.split('<!-- remove -->')[0];
                            content3 = content.split('<!-- remove -->')[1];
                            var script = '<script src="js/app.min.js></script>"';
                            content = content2 + script + content3;

                        }
                        return content; //replace(/[sad ]/g, "_");
                    }
                }
            }
        },
        //Automatikusan újrabuildeli ha változnak
        watch: {
            scripts: {
                files: ['**/*.js', '**/*.html', '**/*.css']
                tasks: ['fast'],
                options: {
                    spawn: false,
                },
            },
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    //Új feladat regisztrálása
    grunt.registerTask('fast', ['uglify', 'copy']);
    grunt.registerTask('default', ['watch']);

};