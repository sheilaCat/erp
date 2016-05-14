$(document).on('click', 'a[name=lookup]', function() {


	var id = $('table tr:hover > td[name=billId]').html().trim();
	location.pathname = ('/orderDetail' + id);

});