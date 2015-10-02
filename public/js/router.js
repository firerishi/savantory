// Filename: router.js
define([
    'jquery'
  , 'underscore'
  , 'backbone'
  , 'views/LandingView'
  , 'views/HomeView'
], function($, _, Backbone, LandingView, HomeView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {

      'home': 'showHome'
      , '*actions': 'defaultAction'

    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:defaultAction', function (actions) { 
      var landingView = new LandingView();
      landingView.render();
    });

    app_router.on('route:showHome', function (actions) { 
      var homeView = new HomeView();
      homeView.render();
    });   

    Backbone.history.start();
  };
 
  return { 
    initialize: initialize
  };
});
