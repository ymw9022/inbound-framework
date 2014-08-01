var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.cRender({title: 'Tests index'});
  // res.send('respond with a resource');
});

module.exports = router;
