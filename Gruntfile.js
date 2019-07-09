module.exports = function(grunt) {

    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       concat: {
          options: {
             separator: ';'
          },
          dist: {
             src: ['src/**/*.js'],
             dest: 'dist/<%= pkg.name %>.js'
          }
       },
       uglify: {
          options: {
             banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
          },
          dist: {
             files: {
                'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
             }
          }
       },
       jshint: {
          // define the files to lint
          files: ['Gruntfile.js', 'src/**/*.js'],
          // configure JSHint
          options: {
             // more options here if you want to override JSHint defaults
             globals: {
                jQuery: true,
             }
          }
       },
       watch: {
          files: ['<%= jshint.files %>'],
          tasks: ['jshint']
       },
       nodemon: {
        dev: {
          script: 'index.js'
        }
      }
  
    });
 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-nodemon');
 
    grunt.registerTask('default', ['jshint', 'concat', 'uglify','nodemon']);
 
 };