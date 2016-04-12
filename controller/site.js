

//site index
exports.index = function(req, res) {
  res.render('index', { current_user: 'Sheila' });
};