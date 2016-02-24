define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tpl/landing.html',
], function($, _, Backbone, Handlebars, homeHB){

  var BookView = Backbone.View.extend({
    el: "#main-content",

    events: {
      'click #save-add-book': 'addBook'
    },

    addBook: function() {
      var name = $('#book-name').val(),
        author = $('#book-author').val(),
        user = $('#user-uid').text(),
        that = this,
        ref = new Firebase("https://savantory.firebaseio.com"),
        SVNTRY = window.SVNTRY || {};

      ref.child("books").child(user).push({
        name: name,
        author: author
      });
    },

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
        ref = new Firebase("https://savantory.firebaseio.com"),
        SVNTRY = window.SVNTRY || {};

      if (authData) {
        this.user = {
          displayName: authData.facebook.displayName,
          firstName: authData.facebook.cachedUserProfile.first_name,
          uid: authData.uid
        };
        template = Handlebars.compile(homeHB);
        $("#main-content").html(template(this.user));

        $('.dropdown-button').dropdown({
          belowOrigin: true
        });

        $('.modal-trigger').leanModal();

        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: authData.facebook.displayName
        });

        this.currentUser = authData.uid;
        SVNTRY.currentUser = authData.uid;
        console.log(this.currentUser);
      } else {
        console.log("User is logged out");
        window.location.hash = '';
      }
    }
  });

  return BookView;
});
