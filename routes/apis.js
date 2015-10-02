var express = require('express');
var router = express.Router();

router.get('/books', function(req, res, next) {
  var db = req.db,
    collection = db.collection('books');

  collection.find().toArray(function(err, result){
    res.json(result);
  });
});

module.exports = router;