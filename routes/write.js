var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/write', function(req, res) {
  res.send('respond with a resource' + req.body.msg);
});

module.exports = router;
