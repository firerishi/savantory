define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tpl/home.html',
  'hb_help_core'
], function($, _, Backbone, Handlebars, landingHB){

  var LandingView = Backbone.View.extend({
    el: "#main-content",

    events: {
    },

    render: function(){

      var template = Handlebars.compile(landingHB)
        , that = this;
        
      $(this.el).html(template({}));

    },

    initialize: function() {
    }
  });

  return LandingView;
});
