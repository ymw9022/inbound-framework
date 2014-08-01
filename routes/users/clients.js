var express = require('express');
var router = express.Router();

console.log("111111111111111111111111111");

/* GET clients listing. */
router.get('/', function(req, res) {
  res.send('clients: respond with a resource');
});

module.exports = router;
