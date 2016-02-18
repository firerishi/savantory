define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tpl/landing.html'
], function($, _, Backbone, Handlebars, homeHB){

  var BookView = Backbone.View.extend({
    el: "#main-content",

    // events: {
    //     'click .menu-bar'              : 'toggle_menu'
    // },

    // toggle_menu: function() {
    //   console.log('toggle time');
    // },

    linkify: function( selector ) {
      if( this.supports3DTransforms ) {      
          var nodes = document.querySelectorAll( selector );

          for( var i = 0, len = nodes.length; i < len; i++ ) {
              var node = nodes[i];

              if( !node.className || !node.className.match( /roll/g ) ) {
                  node.className += ' roll';
                  node.innerHTML = '<span data-title="'+ node.text +'">' + node.innerHTML + '</span>';
              }
          };
      }
    },

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
      } else {
        console.log("User is logged out");
        window.location.hash = '';
      }
    }
  });

  return BookView;
});
