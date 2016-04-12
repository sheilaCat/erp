var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/DB_ERP', function(err, db) {
	if(err) {
		throw err;
	}
	db.collection('user_right').find().toArray(function(err, result) {
		if(err) {
			throw err;
		}

		console.log(result);
	});
});