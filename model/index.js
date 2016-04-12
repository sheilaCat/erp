var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/DB_ERP', {
	server: {poolSize: 20}
}, function (err) {
		if(err) {
			throw err;
		}
});

//model
require('./user');

exports.User = mongoose.model('User');