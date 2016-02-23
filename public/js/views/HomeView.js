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

      this.ref.onAuth(this.authDataCallback);
    },

    initialize: function() {
      this.ref = new Firebase("https://savantory.firebaseio.com");
    },

    authDataCallback: function(authData) {
      var that = this,
        template = null,
        ref = new Firebase("https://savantory.firebaseio.com");

      if (authData) {
        this.user = {
          displayName: authData.facebook.displayName,
          firstName: authData.facebook.cachedUserProfile.first_name
        };
        template = Handlebars.compile(homeHB);
        $("#main-content").html(template(this.user));

        $('.dropdown-button').dropdown({
          belowOrigin: true
        });

        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: authData.facebook.displayName
        });

        this.currentUser = authData.uid;
        console.log(this.currentUser);
      } else {
        console.log("User is logged out");
        window.location.hash = '';
      }
    }
  });

  return BookView;
});
