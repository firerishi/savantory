define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var BookModel = Backbone.Model.extend({
  	urlRoot: "/books",
  	idAttribute: "_id",
  	defaults: {
      _id: null,
      name: "",
      author: ""
    }
  });

  return BookModel;

});