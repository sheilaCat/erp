var express = require('express');
var sign = require('./controller/sign');
var site = require('./controller/site');
var user = require('./controller/user');
var auth = require('./middleware/auth');
var users = require('./controller/users');
var logger = require('./controller/logger');
var sale = require('./controller/sale');
var purchase = require('./controller/purchase');
var warehouse = require('./controller/warehouse');
var task = require('./controller/task');

var router = express.Router();

//home page
router.get('/',  auth.userRequired, site.index);
//login
router.get('/login', sign.showLogin); //跳转到登陆页面
router.post('/login', sign.login); //提交登录信息

//signup
router.get('/signup', sign.showSignUp); //跳转到注册页面
router.post('/signup', sign.signup); //提交注册信息

router.get('/signout', sign.signout); //登出


//user center
router.get('/editUser', user.showEdit); //跳转到修改个人资料
router.post('/editUser', user.edit); //提交修改
router.get('/editUserPass', user.showEditPass); //跳转到修改密码
router.post('/editUserPass', user.editPass); //提交修改
router.get('/editAvatar', user.showEditAvatar); //跳转到修改个人头像
router.post('/editAvatar', user.editAvatar); //提交修改个人头像

//管理所有用户
router.get('/users', users.showUsers);
router.get('/users:pageNum', users.showUsers); //分页查询
router.get('/addUser', users.showAddUser);
router.post('/addUser', users.addUser);
router.get('/editUser:username', users.showEditUser);
router.post('/editUser:username', users.editUser);
router.post('/deleteUser:username', users.deleteUser);
router.post('/users', users.showUsers);

//日志
router.get('/logger', logger.showLog);

//销售管理
router.get('/sale', sale.showSale); //跳转到销售管理页面
router.get('/addSellOrder', sale.showAdd); //增加销售订单
router.post('/addSellOrder', sale.add);
router.get('/orderDetail:id', sale.showOrderDetail); //跳转到订单详情
router.post('/orderDetail', sale.orderDetail); //修改订单详情
router.post('/saleApproval:billId', sale.approval); //审批订单

//采购管理
router.get('/stockApply', purchase.stockApply); 
router.get('/stockApplyDetail', purchase.stockApplyDetail); 
router.get('/stockOrder', purchase.stockOrder); 
router.get('/stockOrderDetail', purchase.stockOrderDetail); 

//仓库管理
router.get('/checked', warehouse.checked); 
router.get('/checkDetail', warehouse.checkDetail); 
router.get('/come', warehouse.come); 
router.get('/comeDetail', warehouse.comeDetail); 
router.get('/outmain', warehouse.outmain); 
router.get('/outmainDetail', warehouse.outmainDetail); 

//任务下达
router.get('/task', task.index); 
router.get('/taskDetail', task.detail); 

module.exports = router;