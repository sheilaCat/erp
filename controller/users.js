var eventproxy = require('eventproxy');
var User = require('../proxy').User;
var validator = require('validator');
var tool = require('../common/tool');

exports.showUsers = function(req, res, next){

	if(!tool.isEmptyObject(req.body)){
		var username 	= validator.trim(req.body.username).toLowerCase();
		var employid 	= validator.trim(req.body.employid);
		var name 	 	= validator.trim(req.body.name);
		var department  = validator.trim(req.body.department);
		var rights 		= req.body.rights;
		//正则处理
		(username === '') && (username = '.*'); 
		(employid === '') && (employid = '.*'); 
		(name 	  === '') && (name 	   = '.*'); 

		(department === 'all') && (department = '.*');

		var query = {
			loginname: 	{$regex: username},
			employid: 	{$regex: employid},
			name: 		{$regex: name},
			department: {$regex: department}
		}
			
		if(typeof(rights) === 'string') {
			//如果rights是string
			query[rights] = true;
		}else{
			//如果rights是数组
			for(var i in rights){
				query[rights[i]] = true;
			}
		}
	}
	
	var ep = new eventproxy();
	ep.fail(next);
	var pageNum = req.params.pageNum;
	var limit = 10;
	var currentNum = 10;
	if(pageNum) {
		var currentNum = pageNum * limit;
	}
	//计算页数
	var totalPageNum;
	User.getCountByQuery('', ep.done(function(count) {
		totalPageNum = Math.ceil(count / limit); 
	}));
	
	var options = {
		sort:'_id',
		limit: 10,
		skip: currentNum - limit
	};

	User.getUsersByQuery(query || '', options, ep.done(function(users) {

		res.render('users/index', {users: users, totalPageNum: totalPageNum});
	}));
};

exports.showAddUser = function(req, res) {
	res.render('users/add');
};

exports.addUser = function(req, res, next) {

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
	//权限
	var userm 		 = req.body.userm ? true : false;
	var salem 		 = req.body.salem ? true : false;
	var warehousem 	 = req.body.warehousem ? true : false;
	var purchasem 	 = req.body.purchasem ? true : false;

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('signup_error', function(msg) {
		res.status(422);
		res.render('users/add', {error:msg, loginname: loginname})
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

			User.newAndSave(loginname, passhash, employid, name, email, position, department, phone, office, userm, salem, warehousem, purchasem, function(err) {
				if (err) {
					return next(err);
				}

				return ep.emit('signup_error', '添加成功！');
			});
		}));
		
	});

};

exports.showEditUser = function(req, res, next) {
	var loginname = req.params.username;

	User.getUserByLoginName(loginname, function(err, user){
		if(err){
			throw err;
		}

		res.render('users/edit', {user: user});
	});
};

exports.editUser = function(req, res, next) {

	var loginname 	 = validator.trim(req.body.loginname).toLowerCase();
	var employid 	 = validator.trim(req.body.employid);
	var name 		 = validator.trim(req.body.name);
	var password 	 = validator.trim(req.body.password);
	var rePassword 	 = validator.trim(req.body.rePassword);
	var email 		 = validator.trim(req.body.email).toLowerCase();
	var position 	 = validator.trim(req.body.position);
	var department   = validator.trim(req.body.department);
	var phone		 = validator.trim(req.body.phone);
	var office		 = validator.trim(req.body.office);
	//权限
	var userm 		 = req.body.userm ? true : false;
	var salem 		 = req.body.salem ? true : false;
	var warehousem 	 = req.body.warehousem ? true : false;
	var purchasem 	 = req.body.purchasem ? true : false;

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('edit_error', function(msg) {

		User.getUserByLoginName(loginname, function(err, user){
			if(err){
				throw err;
			}

			res.status(422);
			res.render('users/edit', {error:msg, user: user});
		});

	});

	if (!tool.validateId(loginname)) {
		return ep.emit('edit_error', '用户名不合法。');
	}

	if (loginname.length < 5) {
	 	ep.emit('edit_error', '用户名至少需要5个字符。');
	    return;
	}

	if (password && password !== rePassword) {
		return ep.emit('edit_error', '两次密码输入不一致。');
	}

	if (email !== '' && !validator.isEmail(email)) {
		return ep.emit('edit_error', '邮箱不合法。');
	}

	User.getUserByLoginName(loginname, ep.done(function(user) {
		
		user.name 					= name;
		user.employid 				= employid;
		user.email 					= email;
		user.position 				= position;
		user.department 			= department;
		user.phone				    = phone;
		user.office				    = office;
		user.user_management 		= userm;
		user.sale_management	    = salem;
		user.warehouse_management   = warehousem;
		user.purchase_management 	= purchasem;

		if(password) {

			//如果修改了密码
			tool.bhash(password, ep.done(function(passhash) {
				user.password = passhash;				

				user.save(function(err) {
					if (err) {
						return next(err);
					}

					res.render('users/edit', {
						error: '修改信息成功！',
						user: user
					});
				});
			}));
		}else{
			user.save(function(err) {
				if (err) {
					return next(err);
				}

				res.render('users/edit', {
					error: '修改信息成功！',
					user: user
				});
			});
		}

	
	}));
};

exports.deleteUser = function(req, res, next){
	var loginname = req.params.username;
	var ep = new eventproxy();

	ep.fail(next);

	User.remove(loginname, function(err){
		if(err){
			return next();
		}

		return;
	});
};