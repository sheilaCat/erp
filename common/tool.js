var bcrypt = require('bcryptjs');

exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

exports.bhash = function (str, callback) {
  bcrypt.hash(str, 10, callback);
};

exports.bcompare = function (str, hash, callback) {
  bcrypt.compare(str, hash, callback);
};

exports.isEmptyObject = function(obj) {
	for (var name in obj) {
		return false;
	}
	return true;
}