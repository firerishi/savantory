// Filename: router.js
define([
    'jquery'
  , 'underscore'
  , 'backbone'
  , 'views/LandingView'
  , 'views/HomeView'
  , 'views/BookView'
], function($, _, Backbone, LandingView, HomeView, BookView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {

      'home': 'showHome',
      'book': 'showBooks',
      '*actions': 'defaultAction'

    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:showHome', function (actions) { 
      var homeView = new HomeView();
      homeView.render();
    });

    app_router.on('route:showBooks', function (actions) { 
      console.log('book route')
      var bookView = new BookView();
      bookView.render();
    });   

    app_router.on('route:defaultAction', function (actions) { 
      var landingView = new LandingView();
      landingView.render();
    });

    Backbone.history.start();
  };
 
  return { 
    initialize: initialize
  };
});
