var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  res.send('server response: ' + req.body.msg);
});

module.exports = router;
