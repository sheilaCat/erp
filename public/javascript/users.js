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

//全选操作
var allCheck = $('#users_list tbody tr td:first-child input[name=action]');
$(document).on('click', '#checkAll', function() {
	if (this.checked) {
		allCheck.attr('checked', true);
	} else {
		allCheck.attr('checked', false);
	}

	if($('input[name=action]:checked').length === 0) {
		$('#deleteMulti').addClass('disabled');
	} else {
		$('#deleteMulti').removeClass('disabled');
	}
});


//页码跳转
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

$('#deleteMulti').on('click', function() {
	var users = []; //存放需要删除的用户数组
	var td = $('input[name=action]:checked').parent().parent().parent().find('td[name=loginname]');

	for(var i = 0; i < td.length;i++){
		users.push($(td[i]).html().trim());
	}

	$.post('/deleteUser' + users);
	location.reload();
});

//批量删除按钮

$('input[name=action]').on('click', function() {
	if($('input[name=action]:checked').length === 0) {
		$('#deleteMulti').addClass('disabled');
	} else {
		$('#deleteMulti').removeClass('disabled');
	}
});