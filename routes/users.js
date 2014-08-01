var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/clients', function(req, res) {
  res.send('users: respond with a resource');
});

module.exports = router;
