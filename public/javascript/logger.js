var logs = $('input[name=data]').attr('value').split('|');

var i = 0;
var length = logs.length-1;
for (;i < length;i++) {
	//构造几个需要的 然后注入
	var date,time,operator,content;
	date = logs[i].slice(1,11);
	time = logs[i].slice(12,20);
	logs[i] = logs[i].slice('43');
	operator = logs[i].split('&')[0];
	content = logs[i].split('&')[1];

	var segment = '<tr><td>' + date + '</td><td>' + time + '</td><td>' + operator + '</td><td>' + content + '</td></tr>';
	$('#log_list tbody').append(segment);
}