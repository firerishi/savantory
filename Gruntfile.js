module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
          cleancss:false,  
          paths: ["css"],   
          syncImport: false,
          strictUnits:false,
          strictMath: true,
          strictImports: true,
          ieCompat: false
        },
        files: {
          "public/css/landing.css": "public/css/landing.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['public/css/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'watch']);

};