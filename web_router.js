var express = require('express');
var sign = require('./controller/sign');

var router = express.Router();

//home page
router.get('/', function(req, res, next) {
  res.render('index', { current_user: 'Sheila' });
});

router.get('/login', function(req, res, next) {
  res.render('login',{_layoutFile: false});
});

//signup
router.get('/signup', sign.showSignUp); //跳转到注册页面
/*router.post('/signup', sign.signup); //提交注册信息*/

module.exports = router;