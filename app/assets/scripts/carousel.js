$(document).ready(function(){

	//var imageForm = $("#imagesUploadForm");
	var carousel = $("#carousel");
	var carouselIndicators = $("#carousel ol.carousel-indicators");
	var carouselInner = $("#carousel div.carousel-inner");
	var oeuvreId = $("div#inventaire").attr('oeuvre');

	if(oeuvreId){
	$.ajax({
		url: "/imagesAPI/getAll/"+oeuvreId,
		type: "get",
		dataType: "json",
		success: function(images){
			

			images.forEach(function(image, idx){

				carouselIndicators.append($("<li></li>",{
					"data-target" : "#carousel",
					"data-slide-to" : idx
				}));

				if(idx == 0){
					carouselInner.append($("<div></div>", { 
						class: "item active"
						}).append($("<img></img>",{
							src: "/images/"+image.oeuvreId+"/"+image.hash,
							class: "img-responsive center-block",
							alt: image.nom
						})).append($("<div></div>",{
							class: "carousel-caption active"
						}).text(image.nom))
					);
				} else {
					carouselInner.append($("<div></div>", { 
						class: "item"
						}).append($("<img></img>",{
							src: "/images/"+image.oeuvreId+"/"+image.hash,
							class: 'img-responsive center-block',
							alt: image.nom
						})).append($("<div></div>",{
							class: "carousel-caption"
						}).text(image.nom))
					);

				}
				

			});
		},
		error: function(){

		} 
	});
}
/*	var url = "/imagesAPI/upload";
	$('#fileupload').fileupload({
		url: url,
		dataType: 'json',
		done: function(e, data){
			$.each(data.result.files, function(index, file){
				$('<p></p>').text(file.name).appendTo('#file');
			});
		},
		progressall: function(e, data){
			var progress = parseInt(data.loaded / data.total *100, 10);
			$('#progress .progress-bar').css('width', progress+'%');
		},

	}).prop('disabled', !$.support.fileInput)
	.parent().addClass($.support.fileInput ? undefined : 'disabled');
*/
	//console.log(JSON.stringify($.support.fileInput));
	/*
	$("#imagesUploadForm").submit(function(event){

		event.preventDefault();
		
		var formObj = $(this);
		var formData = new FormData(this);

		
		$.ajax({
			url: "/imagesAPI/upload",
			type: 'post',
			mimeType:"multipart/form-data",
			data: formObj.serialize(),
			success: function(data){
				alert(data);
			},
			error: function(err){
				alert(err);
			}
		});
	});
	/*
	carousel.hover(function(eventIn){
		$("#imagesUploadForm").show().fadeIn();
	}, function(eventOut){
		$("#imagesUploadForm").hide().fadeOut();
	});
*/


});