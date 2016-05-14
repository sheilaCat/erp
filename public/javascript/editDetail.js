var id = location.pathname.slice(12)
if ($('input[name=billId]').attr('value') === undefined) {
	$('input[name=billId]').attr('value', id);
} 