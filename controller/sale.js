var eventproxy = require('eventproxy');
var SellOrder = require('../proxy').SellOrder;
var validator = require('validator');
var User = require('../proxy').User;
var logger = require('../log').logger;

exports.showSale = function(req, res, next) {
	var ep = new eventproxy();
	ep.fail(next);
	var options = {
		sort:'_id',
		limit: 10
	};

	SellOrder.getSellOrderByQuery('', options, ep.done(function(sellOrder) {

		res.render('sale/index', {sellOrder: sellOrder});
	}));
};

exports.showAdd = function(req, res, next) {
	var ep = new eventproxy();
	ep.fail(next);

	res.render('sale/add');
};

exports.add = function(req, res, next) {
	var ep = new eventproxy();
	ep.fail(next);

	var sinName 		 	= validator.trim(req.body.sinName);
	var empId 			    = validator.trim(req.body.empId);
	var empName 	 		= validator.trim(req.body.empName);
	var remark				= validator.trim(req.body.remark);
	var totalMoney		    = validator.trim(req.body.totalMoney);

	ep.on('add_error', function(msg) {
		res.status(422);
		res.render('sale/add', {error:msg})
	});

	if ([sinName,empId,empName,totalMoney].some(function (item) { return item === ''; })) {
		ep.emit('add_error', '请填写完整必填信息。');
		return;
	}

	SellOrder.newAndSave(sinName, empId, empName, req.session.user.name, remark, totalMoney, function(err) {
		if (err) {
			return next(err);
		}

		logger.info(req.session.user.loginname + '&' + '制作了销售表单' + sinName + '|');

		return ep.emit('add_error', '添加成功！');

	});

};