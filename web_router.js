var express = require('express');
var sign = require('./controller/sign');
var site = require('./controller/site');
var user = require('./controller/user');
var auth = require('./middleware/auth');

var router = express.Router();

//home page
router.get('/',  auth.userRequired, site.index);
//login
router.get('/login', sign.showLogin); //跳转到登陆页面
router.post('/login', sign.login); //提交登录信息

//signup
router.get('/signup', sign.showSignUp); //跳转到注册页面
router.post('/signup', sign.signup); //提交注册信息

router.get('/signout', sign.signout); //登出


//user center
router.get('/editUser', user.showEdit); //跳转到修改个人资料
router.post('/editUser', user.edit); //提交修改
router.get('/editUserPass', user.showEditPass);
router.post('/editUserPass', user.editPass); 

module.exports = router;