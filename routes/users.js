var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a user resource');
});

router.put('/', function (req, res) {
  res.send('Got a PUT request at /user');
});

module.exports = router;
