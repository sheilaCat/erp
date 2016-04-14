$(document).on('click', 'a[name=editOneUser]', function() {
	var username = $('table tr:hover > td[name=loginname]').html().trim();
	location.pathname = '/editUser' + username;
});


$(document).on('click', 'a[name=deleteOneUser]', function() {


	var username = $('table tr:hover > td[name=loginname]').html().trim();
	$('#deleteUserMsg .content p').html('确认删除用户' + username + "?");

	$('#deleteUserMsg').modal('show');

	$(document).on('click', '#deleteUserMsg .ok', function() {
		$.ajax({
			url: '/deleteUser' + username,
			method: 'POST'
		});

		location.reload();
	});

});

var allCheck = $('#users_list tbody tr td:first-child input[name=action]');
$(document).on('click', '#checkAll', function() {
	if (this.checked) {
		allCheck.attr('checked', true);
	} else {
		allCheck.attr('checked', false);
	}
});

$(document).on('click', '#pagination', function(e) {
	if(e.target.tagName === 'A') {
		var pageNum = $(e.target).html().trim();

		location.pathname = ('/users' + pageNum);
	}
});



var displayPageNum = function() {

	//显示总页数
	totalPageNumber = $('input[name=pageNumber]').attr('value');
	var i = 0;
	for(;i < totalPageNumber;i++){
		$('#pagination').append('<a class="item" name="page">' + (i+1) + '</a>');
	}
	//当前页码
	var currentPageNum = location.pathname.replace('/users', '');
	$('a[name=page]').removeClass('active')
	$($('a[name=page]')[currentPageNum - 1]).addClass('active');
};

displayPageNum();