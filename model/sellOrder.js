var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SellOrderSchema = new Schema({
	billId: {type: String},
	billDate: {type: Date, default: Date.now},
	sinName: {type: String},
	orderStatus: {type: Number, default:1},
	empId: {type: String},
	empName: {type: String},
	makeEmpName: {type: String},
	auditingEmpName: {type: String},
	checkStatus: {type: Boolean, default: false},
	remark: {type: String},
	totalMoney: {type: Number}
});

mongoose.model('SellOrder', SellOrderSchema);