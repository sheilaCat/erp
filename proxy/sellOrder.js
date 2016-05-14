var model = require('../model');
var SellOrder = model.SellOrder;

exports.getSellOrderByQuery = function (query, opt, callback) {
  SellOrder.find(query, '', opt, callback);
};

exports.newAndSave = function (sinName, empId, empName, makeEmpName, remark, totalMoney, callback) {
  var sellOrder                 = new SellOrder();
  sellOrder.sinName             = sinName;
  sellOrder.empId               = empId;
  sellOrder.empName             = empName;
  sellOrder.makeEmpName         = makeEmpName;
  sellOrder.remark              = remark;
  sellOrder.totalMoney          = totalMoney;

  sellOrder.save(callback);
};