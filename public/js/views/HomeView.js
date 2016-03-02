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
        read = $('#read-book-checked').prop('checked'),
        that = this,
        ref = new Firebase("https://savantory.firebaseio.com"),
        SVNTRY = window.SVNTRY || {};

      ref.child("books").child(user).push({
        name: name,
        author: author,
        read: read,
        reading: !read
      });
    },

    render: function(){
      this.auth();
    },

    initialize: function() {
      this.ref = new Firebase("https://savantory.firebaseio.com");
    },

    auth: function() {
      var that = this,
        template = null,
        ref = new Firebase("https://savantory.firebaseio.com"),
        SVNTRY = window.SVNTRY || {},
        user = {};

      ref.onAuth(function(authData) {

        if (authData) {
          ref.child("users").child(authData.uid).set({
            provider: authData.provider,
            name: authData.facebook.displayName
          });

          user = {
            displayName: authData.facebook.displayName,
            firstName: authData.facebook.cachedUserProfile.first_name,
            uid: authData.uid
          };
          that.user = user;
          that.renderBooks(user);

        } else {
          console.log("User is logged out");
          window.location.hash = '';
        }

      });
    },

    renderBooks: function(user) {
      var template = null,
        ref = new Firebase("https://savantory.firebaseio.com"),
        books = [];

      //get books
      // console.log(this.user);
      var refBooks = new Firebase("https://savantory.firebaseio.com/books/"+user.uid);
      refBooks.on("child_added", function(snapshot, prevChildKey) {
        var newPost = snapshot.val();
        // console.log("books: " + newPost.name);
        books.push(newPost);
        // console.log(books);

        template = Handlebars.compile(homeHB);
        $("#main-content").html(template({
          user: user,
          books: books
        }));

        $('.dropdown-button').dropdown({
          belowOrigin: true
        });

        $('.modal-trigger').leanModal();
      });


    }

  });

  return BookView;
});
