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

exports.newAndSave = function (loginname, password, employid, name, email, position, department, phone, office, userm, salem, warehousem, purchasem, callback) {
  var user                    = new User();
  user.loginname              = loginname;
  user.password               = password;
  user.employid               = employid;
  user.name                   = name;
  user.email                  = email;
  user.position               = position;
  user.department             = department;
  user.phone                  = phone;
  user.office                 = office;
  user.user_management        = userm;
  user.sale_management        = salem;
  user.warehouse_management   = warehousem;
  user.purchase_management    = purchasem;

  user.save(callback);
};

/**
* 按用户名删除一用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginname 关键字
 * @param {Function} callback 回调函数
*/

exports.remove = function (loginname, callback) {
  User.remove({loginname: loginname}, callback);
};

exports.getCountByQuery = function(query, callback) {
  User.count(query, callback);
};