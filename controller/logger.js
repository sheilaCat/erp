/*var logger = require('../log').logger;*/

exports.showLog = function(req, res) {
	var rf = require("fs");
	var data = rf.readFileSync("logs/log.log","utf-8");
/*	logger.info('Cheese was breeding ground for listeria.');*/

	/*res.end(data);*/


  	res.render('logger/logger.html', {data: data});
};