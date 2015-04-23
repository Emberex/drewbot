var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {

    var date = new Date();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
    res.send('server response: ' + req.body.msg + " at " + formattedTime);
});

module.exports = router;
