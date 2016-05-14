var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderDetailSchema = new Schema({
	billId: {type: String},
	matId: {type: String},
	matName: {type: String},
	matSpec: {type: String},
	matUnit: {type: String},
	number: {type: Number},
	cliId: {type: String},
	cliPlace: {type: String},
	agioAgoPrice: {type: Number},
	agio: {type: Number},
	price: {type: Number},
	money: {type: Number},
	factCost: {type: Number},
	criterionCost: {type: Number},
	outStoreroom: {type: Date},
	notOutNumber: {type: Number}
});

mongoose.model('OrderDetail', OrderDetailSchema);