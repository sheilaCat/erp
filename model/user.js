var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	loginname: {type: String},
	password: {type: String},
	employid: {type: String},
	name: {type: String},
	email: {type: String},
	position: {type: String},
	department: {type: String},
	phone: {type: String},
	office: {type: String},

	user_management: {type: Boolean, default: false},
	sale_management: {type: Boolean, default: false},
	warehouse_management: {type: Boolean, default: false},
	purchase_management: {type: Boolean, default: false}
});

UserSchema.index({loginname: 1}, {unique: true});

mongoose.model('User', UserSchema);