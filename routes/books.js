var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var db = req.db,
    collection = db.collection('books');

  collection.find().toArray(function(err, result){
    res.render('books', {
      'booklist': result
    });
  });
});

router.get('/addbook', function(req, res, next) {
  var db = req.db,
    collection = db.collection('books');

  collection.find().toArray(function(err, result){
    res.render('addbook', {
      'title': 'Add New Book'
    });
  });
});

module.exports = router;