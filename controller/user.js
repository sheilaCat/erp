var validator = require('validator');
var eventproxy = require('eventproxy');
var User = require('../proxy').User;

//用户修改个人资料
exports.showEdit = function(req, res) {
	res.render('user');
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
		res.render('user', {error:msg});
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
			res.render('user', {error: '修改信息成功！',current_user:user});
		})
	}));

};