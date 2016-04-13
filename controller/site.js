

//site index
exports.index = function(req, res) {
	console.log('-----------------------------current_user:' + res.locals.current_user);
  	res.render('index');
};