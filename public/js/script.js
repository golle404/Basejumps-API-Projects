$(document).ready(function() {

	var file;
	$('input[type=file]').on('change', function() {
		file = event.target.files[0];
	});
	$('form').on('submit', function(event) {

		event.stopPropagation();
		event.preventDefault();

		var data = new FormData();
		data.append("file", file)
		
		$.ajax({
			url: window.location.origin + '/api/fileanalyse/',
			type: 'POST',
			data: data,
			cache: false,
			processData: false,
			contentType: false,
			error: function(jqXHR, textStatus, errorThrown) {
				alert('ERRORS: ' + textStatus);
			},
			success: function(data) {
				//alert('FILE SIZE: ' + data.fileSize);
				$("#response-json").text(JSON.stringify(data))
			}
		});
	});
});