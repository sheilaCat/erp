var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login',{_layoutFile: false});
});

module.exports = router;
