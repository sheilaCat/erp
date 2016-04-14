var validator = require('validator');
var eventproxy = require('eventproxy');
var User = require('../proxy').User;
var tool = require('../common/tool');

//用户修改个人资料
exports.showEdit = function(req, res) {
	res.render('user/user');
};

//用户修改个人密码
exports.showEditPass = function(req, res) {
	res.render('user/userPass');
};

exports.edit = function(req, res, next) {
	var name 		 = validator.trim(req.body.name);
	var email 		 = validator.trim(req.body.email).toLowerCase();
	var position 	 = validator.trim(req.body.position);
	var department   = validator.trim(req.body.department);
	var phone		 = validator.trim(req.body.phone);
	var office		 = validator.trim(req.body.office);

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('edit_error', function(msg) {
		res.status(422);
		res.render('user/user', {error:msg});
	});

	if (email !== '' && !validator.isEmail(email)) {
		return ep.emit('edit_error', '邮箱不合法。');
	}

	User.getUserById(req.session.user._id, ep.done(function(user) {
		
		user.name = name;
		user.email = email;
		user.position = position;
		user.department = department;
		user.phone = phone;
		user.office = office;
		user.save(function(err) {
			if(err) {
				return next(err);
			}

			req.session.user = user.toObject({virtual: true});
			res.render('user/user', {error: '修改信息成功！',current_user:user});
		})
	}));

};

exports.editPass = function(req, res, next) {
	var oldPassword = validator.trim(req.body.oldPassword);
	var newPassword = validator.trim(req.body.newPassword);
	var rePassword = validator.trim(req.body.rePassword);

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('edit_error', function(msg) {
		res.status(422);
		res.render('user/userPass', {error:msg});
	});

	if (newPassword !== rePassword) {
		return ep.emit('edit_error', '两次新密码输入不一致。');
	}

	User.getUserById(req.session.user._id, ep.done(function(user) {
		if(!user) {
			return next(err);
		}

		var passhash = user.password;
		tool.bcompare(oldPassword, passhash, ep.done(function(bool) {
			if(!bool) {
				return ep.emit('edit_error', '旧密码输入错误！');
			}

			tool.bhash(newPassword, ep.done(function (passhash2) {
				user.password = passhash2;
				user.save(function(err) {
					if(err) {
						return next(err);
					}
					req.session.user = user.toObject({virtual: true});
					res.render('user/userPass', {error: '修改信息成功！'});
				});
			}))
		
		}))

	}));
};