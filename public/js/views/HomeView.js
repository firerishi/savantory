define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tpl/landing.html',
], function($, _, Backbone, Handlebars, homeHB){

  var BookView = Backbone.View.extend({
    el: "#main-content",

    render: function(){

      $('#main-nav li').removeClass('active');
      $('#main-nav li a[href="#"]').parent().addClass('active');

      $(this.el).removeClass();

      var ref = new Firebase("https://savantory.firebaseio.com");
      ref.onAuth(this.authDataCallback);
    },

    initialize: function() {
      this.supports3DTransforms =  document.body.style['webkitPerspective'] !== undefined|| document.body.style['MozPerspective'] !== undefined;
    },

    authDataCallback: function(authData) {
      var that = this;
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        this.user = {
          displayName: authData.facebook.displayName,
          firstName: authData.facebook.cachedUserProfile.first_name
        };
        var template = Handlebars.compile(homeHB);
        console.log(this.user);
        $("#main-content").html(template(this.user));

         $('.dropdown-button').dropdown({
          belowOrigin: true
         });
      } else {
        console.log("User is logged out");
        window.location.hash = '';
      }
    }
  });

  return BookView;
});
