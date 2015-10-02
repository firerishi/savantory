define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tpl/home.html'
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

      var template = Handlebars.compile(homeHB);
      $(this.el).html(template());

      this.linkify('a.threeD');

    },

    initialize: function() {
      this.supports3DTransforms =  document.body.style['webkitPerspective'] !== undefined|| document.body.style['MozPerspective'] !== undefined;

      
    }
  });

  return BookView;
});
