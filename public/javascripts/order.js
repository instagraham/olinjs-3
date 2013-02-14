$(function () {

	$('#neworder').on('submit', function() {
		$.post("/order/create", 
			$('#neworder').serialize());
		return false;
	});

	$('#orders').on('submit', function() {
		$.post("/order/delete", 
			$('#orders').serialize());
		return false;
	});

});