define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tpl/landing.html',
  'masonry'
], function($, _, Backbone, Handlebars, homeHB, Masonry){

  var BookView = Backbone.View.extend({
    el: "#main-content",

    events: {
      'click #save-add-book': 'addBook',
      'click .card-action': 'changeReadStatus'
    },

    changeReadStatus: function(e) {
      var $target = $(e.target),
        $currentTarget = $(e.currentTarget),
        user = $('#user-uid').text(),
        ref = new Firebase("https://savantory.firebaseio.com"),
        name, author, read, reading, key,
        that = this;

      if ($target.hasClass('chip')) {
        name = $currentTarget.data('name');
        author = $currentTarget.data('author');
        read = $currentTarget.data('read');
        reading = $currentTarget.data('reading');
        key = $currentTarget.data('key');

        // console.log(name, author, !read, !reading, key);

        ref.child("books").child(user).child(key).update({
          read: !read,
          reading: !reading
        }, function() {
          // that.renderBooksUpdate(user);
          $currentTarget.data('read', !read);
          $currentTarget.data('reading', !reading);
          if (!read) {
            $target.addClass('deep-purple darken-1');
            $target.removeClass('orange darken-1');
            $target.text('Read');
          } else {
            $target.removeClass('deep-purple darken-1');
            $target.addClass('orange darken-1');
            $target.text('Reading');
          }
        })
      }
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

    renderBooksUpdate: function(user) {
      var template = null,
        ref = new Firebase("https://savantory.firebaseio.com/books/"+user),
        books = [], bookItem = {};

      ref.on("value", function(snapshot) {
        books = [];
        snapshot.forEach(function(book){
          // console.log(book.val());
          // console.log(book.key());
          bookItem = book.val();
          bookItem.key = book.key();
          books.push(bookItem);
        })
        
        // console.log(books);

        template = Handlebars.compile(homeHB);
        $("#main-content").html(template({
          user: user,
          books: books
        }));

        new Masonry('.book-grid', {
          itemSelector: '.grid-item'
        });

        $('.dropdown-button').dropdown({
          belowOrigin: true
        });

        $('.modal-trigger').leanModal();
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
        newPost.key = snapshot.key();
        // console.log("books: " + newPost.name);
        books.push(newPost);
        // console.log(newPost);

        template = Handlebars.compile(homeHB);
        $("#main-content").html(template({
          user: user,
          books: books
        }));

        new Masonry('.book-grid', {
          itemSelector: '.grid-item'
        });

        $('.dropdown-button').dropdown({
          belowOrigin: true
        });

        $('.modal-trigger').leanModal();
      });


    }

  });

  return BookView;
});
