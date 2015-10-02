var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json([
	  {
	    "id": 2,
	    "referenceId": 3234,
	    "name": "Node: Up and Running",
	    "author": [
	      "Mike Wilson",
	      "Tom Hughes-Croucher"
	    ]
	  }
	]);
});

module.exports = router;