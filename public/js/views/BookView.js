define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tpl/books.html',
  'hb_help_core'
], function($, _, Backbone, Handlebars, booksHB){

  var booksView = Backbone.View.extend({
    el: "#main-content",

    events: {
    },

    render: function(){

      var template = Handlebars.compile(booksHB)
        , that = this;
        
      $(this.el).html(template({}));

    },

    initialize: function() {
    }
  });

  return booksView;
});
