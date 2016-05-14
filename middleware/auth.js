var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var eventproxy = require('eventproxy');
var UserProxy = require('../proxy').User;


exports.userRequired = function(req, res, next) {

	  if (!req.session || !req.session.user || !req.session.user._id) {
	   	res.status(403);
	   	res.redirect('/login');
	  }

	  next();
};

exports.adminRequired = function(req, res, next) {
	if(!req.session.user) {
		return res.render('notify/notify', { error: '你还没有登录。'});
	}

	if(!req.session.user.is_admin) {
		return res.render('notify/notify', {error:'需要管理员权限。'})
	}

	next();
};


function gen_session(user, res) {
	var auth_token = user._id + '$$$$';
	var opts = {
		path: '/',
		maxAge: 1000 * 60 * 24 * 30, //30天
		signed: true,
		httpOnly:true
	};
	res.cookie('ERP', auth_token, opts);
}

exports.gen_session = gen_session;

var config = {
	debug: true,
	admins: { worddd : true }
}

// 验证用户是否登录
exports.authUser = function (req, res, next) {
  var ep = new eventproxy();
  ep.fail(next);

  // Ensure current_user always has defined.
  res.locals.current_user = null;

  ep.on('get_user', function (user) {
    if (!user) {
      return next();
    }
    user = res.locals.current_user = req.session.user = new UserModel(user);

    if (config.admins.hasOwnProperty(user.loginname)) {
      user.is_admin = true;
    }

    return next();
  });

  if (req.session.user) {
    ep.emit('get_user', req.session.user);
  } else {
    var auth_token = req.signedCookies['ERP'];
    if (!auth_token) {
      return next();
    }

    var auth = auth_token.split('$$$$');
    var user_id = auth[0];
    UserProxy.getUserById(user_id, ep.done('get_user'));

  }


};
