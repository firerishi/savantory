var express = require('express');
var router = express.Router();

router.get('/books', function(req, res, next) {
  var db = req.db,
    collection = db.collection('books');

  collection.find().toArray(function(err, result){
    res.json(result);
  });
});

router.post('/books', function(req, res) {
    var db = req.db;
    var collection = db.collection('books');
    var name = req.body.name;
    var author = req.body.author;

    collection.insert({
        "name" : name,
        "author" : author,
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.status(201).redirect('../../books');
        }
    });
});

module.exports = router;