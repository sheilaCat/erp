var model = require('../model');
var OrderDetail = model.OrderDetail;

exports.getOrderDetailByQuery = function (query, opt, callback) {
  OrderDetail.find(query, '', opt, callback);
};

exports.getOrderDetailByBillId = function (billId, callback) {
  OrderDetail.findOne({'billId': billId}, callback);
};

exports.newAndSave = function (billId, matId, matName, matSpec, matUnit, number, cliId, cliPlace, agioAgoPrice, agio, price, money, factCost, criterionCost, outStoreroom, notOutNumber, callback) {
  var orderDetail                 = new OrderDetail();
  orderDetail.billId              = billId;
  orderDetail.matId               = matId;
  orderDetail.matName             = matName;
  orderDetail.matSpec             = matSpec;
  orderDetail.matUnit             = matUnit;
  orderDetail.number              = number;
  orderDetail.cliId               = cliId;
  orderDetail.cliPlace            = cliPlace;
  orderDetail.agioAgoPrice        = agioAgoPrice;
  orderDetail.agio                = agio;
  orderDetail.price               = price;
  orderDetail.money               = money;
  orderDetail.factCost            = factCost;
  orderDetail.criterionCost       = criterionCost;
  orderDetail.outStoreroom        = outStoreroom;
  orderDetail.notOutNumber        = notOutNumber;
  orderDetail.save(callback);
};