

//sign up
exports.showSignUp = function(req, res) {
	res.render('sign/signup',{_layoutFile: false});
};

exports.signup = function(req, res, next) {

};