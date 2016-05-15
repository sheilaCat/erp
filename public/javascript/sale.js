$(document).on('click', 'a[name=lookup]', function() {


	var id = $('table tr:hover > td[name=billId]').html().trim();
	location.pathname = ('/orderDetail' + id);

});


//全选操作
var allCheck = $('#sale_list tbody tr td:first-child input[name=action]');
$(document).on('click', '#checkAll', function() {
	if (this.checked) {
		allCheck.prop('checked', true);
	} else {
		allCheck.prop('checked', false);
	}

	if($('input[name=action]:checked').length === 0) {
		$('#approvalMuti').addClass('disabled');
	} else {
		$('#approvalMuti').removeClass('disabled');
	}

	if($('input[name=action]:checked').length === 0) {
		$('#approvalMuti').addClass('disabled');
	} else {
		$('#approvalMuti').removeClass('disabled');
	}

	if($('input[name=action]:checked').length === 0) {
		$('#approvalMuti').addClass('disabled');
	} else {
		$('#approvalMuti').removeClass('disabled');
	}
});

$('input[name=action]').on('click', function() {
	if($('input[name=action]:checked').length === 0) {
		$('#approvalMuti').addClass('disabled');
	} else {
		$('#approvalMuti').removeClass('disabled');
	}
});