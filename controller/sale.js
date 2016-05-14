var eventproxy = require('eventproxy');
var SellOrder = require('../proxy').SellOrder;
var validator = require('validator');
var User = require('../proxy').User;
var OrderDetail = require('../proxy').OrderDetail;
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

exports.showOrderDetail = function(req, res, next) { //跳转到修改
	var ep = new eventproxy();
	ep.fail(next);
	var billId = req.originalUrl.slice(12);
	OrderDetail.getOrderDetailByBillId(billId, ep.done(function(orderDetail) {
		res.render('sale/detail', {orderDetail: orderDetail});
	}));
};

exports.orderDetail = function(req, res, next) {
	var ep = new eventproxy();
	ep.fail(next);

	var billId 		 	= validator.trim(req.body.billId);
	var matId 			= validator.trim(req.body.matId);
	var matName 	    = validator.trim(req.body.matName);
	var matSpec			= validator.trim(req.body.matSpec);
	var matUnit		    = validator.trim(req.body.matUnit);
	var number		    = validator.trim(req.body.number);
	var cliId		    = validator.trim(req.body.cliId);
	var cliPlace		= validator.trim(req.body.cliPlace);
	var agioAgoPrice    = validator.trim(req.body.agioAgoPrice);
	var agio		    = validator.trim(req.body.agio);
	var price		    = validator.trim(req.body.price);
	var money		    = validator.trim(req.body.money);
	var factCost	    = validator.trim(req.body.factCost);
	var criterionCost   = validator.trim(req.body.criterionCost);
	var outStoreroom    = validator.trim(req.body.outStoreroom);
	var notOutNumber	= validator.trim(req.body.notOutNumber);

	OrderDetail.getOrderDetailByBillId(billId, ep.done(function(orderDetail) {
		if(!orderDetail) {

			var orderDetail = {};
			orderDetail.billId 		= billId;
			orderDetail.matId 		= matId;
			orderDetail.matName  	= matName;
			orderDetail.matSpec 	= matSpec;
			orderDetail.matUnit 	= matUnit;
			orderDetail.number 		= number;
			orderDetail.cliId 		= cliId;
			orderDetail.cliPlace 	= cliPlace;
			orderDetail.agioAgoPrice= agioAgoPrice;
			orderDetail.agio 		= agio;
			orderDetail.price 		= price;
			orderDetail.money 		= money;
			orderDetail.factCost 	= factCost;
			orderDetail.criterionCost = criterionCost;
			orderDetail.outStoreroom  = outStoreroom;
			orderDetail.notOutNumber  = notOutNumber;
			OrderDetail.newAndSave(billId, matId, matName, matSpec, matUnit, number, cliId, cliPlace, agioAgoPrice, agio, price, money, factCost, criterionCost, outStoreroom, notOutNumber, function(err) {
				if (err) {
					return next(err);
				}

				logger.info(req.session.user.loginname + '&' + '新建了订单详情' + billId + '|');
				res.render('sale/detail', {error:'修改成功！', orderDetail:orderDetail});
			});
		} else {
			orderDetail.billId 		= billId;
			orderDetail.matId 		= matId;
			orderDetail.matName  	= matName;
			orderDetail.matSpec 	= matSpec;
			orderDetail.matUnit 	= matUnit;
			orderDetail.number 		= number;
			orderDetail.cliId 		= cliId;
			orderDetail.cliPlace 	= cliPlace;
			orderDetail.agioAgoPrice= agioAgoPrice;
			orderDetail.agio 		= agio;
			orderDetail.price 		= price;
			orderDetail.money 		= money;
			orderDetail.factCost 	= factCost;
			orderDetail.criterionCost = criterionCost;
			orderDetail.outStoreroom  = outStoreroom;
			orderDetail.notOutNumber  = notOutNumber;

			orderDetail.save(function(err) {
				if (err) {
					return next(err);
				}

				logger.info(req.session.user.loginname + '&' + '修改了订单详情' + billId + '|');
				res.render('sale/detail', {error:'修改成功！', orderDetail:orderDetail});
			});
		}
	}));
};