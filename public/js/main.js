// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min',
    masonry: '../bower_components/masonry/dist/masonry.pkgd',
    materialize : '../bower_components/Materialize/dist/js/materialize',
    hammer : '../bower_components/Materialize/js/hammer.min',
    velocity : '../bower_components/Materialize/js/velocity.min',
    scrollFire : '../bower_components/Materialize/js/scrollFire',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    bootstrap: 'libs/bootstrap/js/bootstrap.min',
    text: 'text',
    handlebars: 'libs/handlebars/handlebars',
    tpl: '../handlebars',
    hb_help_core: 'handlebars/core'
  },
  shim: {
      'materialize': {
          deps: ['jquery', 'hammer', 'velocity', 'scrollFire']
      },
      'jquery': {
          exports: '$'
      },
      'masonry': {
        deps: ['jquery']
      }
  }
});

require([
  // Load our app module and pass it to our definition function
  'app',
  'jquery',
  'materialize',
  'masonry'
], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
