var model = require('../model');
var User = model.User;

/**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
exports.getUsersByQuery = function (query, opt, callback) {
  User.find(query, '', opt, callback);
};

exports.getUserByLoginName = function (loginname, callback) {
	User.findOne({'loginname': loginname}, callback);
};

exports.getUserById = function (id, callback) {
  if (!id) {
    return callback();
  }
  User.findOne({_id: id}, callback);
};

exports.newAndSave = function (loginname, password, callback) {
  var user         = new User();
  user.loginname   = loginname;
  user.password        = password;
  user.save(callback);
};