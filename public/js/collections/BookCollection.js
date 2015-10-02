define([
  'underscore',
  'backbone',
  '../models/BookModel'
], function(_, Backbone, BookModel) {
  
  var BookCollection = Backbone.Collection.extend({
  	model: BookModel,
  	url: "/books"
  });

  return BookCollection;

});