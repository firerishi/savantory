define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  '../models/BookModel',
  '../collections/BookCollection',
  'text!tpl/books.html',
  'hb_help_core'
], function($, _, Backbone, Handlebars, BookModel, BookColl, bookHB){

  var BookView = Backbone.View.extend({
    el: "#main-content",
    banner: "#banner-image",
    bannerName: "#banner-name",

    render: function(){
      
      var that = this
        , book = new BookColl()
        , hash = window.location.hash;

      $('#main-nav li').removeClass('active');
      $('#main-nav li a[href="'+hash+'"]').parent().addClass('active');

      $(that.el).addClass('books');

      var template = Handlebars.compile(bookHB);
      $(that.el).html(template({book: null}));

      setTimeout(function() {

      book.fetch({
        success: function() {
          $(that.el).html(template({book: book.toJSON()}));

          new AnimOnScroll( document.getElementById( 'grid' ), {
              minDuration : 0.4,
              maxDuration : 0.7,
              viewportFactor : 0.2
          } );
        }
      });

      }, 2000);

      $(this.banner).removeClass();

    }
  });

  return BookView;
});
