var User = require('../proxy').User;
var validator = require('validator');
var eventproxy = require('eventproxy');
var authMiddleWare = require('../middleware/auth');
var tool = require('../common/tool');
var logger = require('../log').logger;

//sign up
exports.showSignUp = function(req, res) {
	res.render('sign/signup');
};

exports.signup = function(req, res, next) {

	var loginname	 = validator.trim(req.body.loginname).toLowerCase();
	var password	 = validator.trim(req.body.password);
	var rePassword   = validator.trim(req.body.rePassword);
	var employid	 = validator.trim(req.body.employid);
	var name 		 = validator.trim(req.body.name);
	var email 		 = validator.trim(req.body.email).toLowerCase();
	var position 	 = validator.trim(req.body.position);
	var department   = validator.trim(req.body.department);
	var phone		 = validator.trim(req.body.phone);
	var office		 = validator.trim(req.body.office);

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('signup_error', function(msg) {
		res.status(422);
		res.render('sign/signup', {error:msg, loginname: loginname})
	});
	
	if ([loginname,password,rePassword].some(function (item) { return item === ''; })) {
		ep.emit('signup_error', '请填写完整必填信息。');
		return;
	}

	if (!tool.validateId(loginname)) {
		return ep.emit('signup_error', '用户名不合法。');
	}

	if (loginname.length < 5) {
	 	ep.emit('signup_error', '用户名至少需要5个字符。');
	    return;
	}

	if (password !== rePassword) {
		return ep.emit('signup_error', '两次密码输入不一致。');
	}

	if (email !== '' && !validator.isEmail(email)) {
		return ep.emit('signup_error', '邮箱不合法。');
	}

		
	User.getUsersByQuery(
		{'loginname': loginname}
		, {}, function (err, users) {
		if (err) {
			return next(err);
		}
		if (users.length > 0) {
			ep.emit('signup_error', '用户名已被使用。');
			return;
		}

		tool.bhash(password, ep.done(function (passhash) {

			User.newAndSave(loginname, passhash, employid, name, email, position, department, phone, office, false, false, false, false,function(err) {
				if (err) {
					return next(err);
				}
				logger.info(loginname + '&新注册用户|');

				res.render('sign/login');
			});
		}));
		
	});

};

//login
exports.showLogin = function(req, res) {
	res.render('sign/login');
};

exports.login = function(req, res, next) {
	var loginname	 = validator.trim(req.body.loginname).toLowerCase();
	var password	 = validator.trim(req.body.password);
	var ep = new eventproxy();

	if (!loginname || !password) {
		res.status(422);
		return res.render('sign/login', {
			error: '信息不完整。'
		});
	}

	ep.on('login_error', function(){
		res.status(403);
		res.render('sign/login', {error: '用户名或密码错误。'});
	});

	User.getUserByLoginName(loginname, function(err, user) {
		if (err) {
			return next(err);
		}
		
		if(!user) {
			return ep.emit('login_error');
		}

		var passhash = user.password;
		tool.bcompare(password, passhash, ep.done(function(bool) {
			if(!bool) {
				return ep.emit('login_error');
			}

			authMiddleWare.gen_session(user, res);
			res.redirect('/');
		}))


	});
};

exports.signout = function (req, res, next) {
	req.session.destroy();
	res.clearCookie('ERP', { path: '/' });
	res.redirect('/login');
};


