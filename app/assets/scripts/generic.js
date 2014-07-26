function popReport(){
		$("#userReport").popover({
			html: true,
			content: function(){
				return $( "#popoverContentReport").html();
			}
		});
}

function addUserReport(event){
	//event.preventDefault();
	var form= $('#userReportForm');
	console.log("meh : "+$('form').serialize());
	$.ajax('/userReport/create',{
		type: 'post',
		data:  form.serialize(),
		success: function(result){
			$("#userReport").popover("toggle");
			console.log("HARDOGAY FOOOOOO!!!! "+JSON.stringify(result));
		},
		error: function(req, err, errMsg){
			console.log("Quelque chose à merdé..."+req+"/"+err+"/"+errMsg);
		}
		
	});
	
}


/*
$(document).ready(function(){

$("#userReportForm").on("submit", function(event){
	
	var form= $('#userReportForm');
	$.ajax('/userReport/create',{
		type: 'post',
		data:  form.serialize(),
		success: function(result){
			$("#userReport").popover("toggle");
			console.log("HARDOGAY FOOOOOO!!!! "+JSON.stringify(result));
		},
		error: function(req, err, errMsg){
			console.log("Quelque chose à merdé..."+req+"/"+err+"/"+errMsg);
		}
		
	});
	event.preventDefault();
});
})
*/

/*
$('button.btn.btnAdd.userReportSubmit').on('click', function(event){
	event.preventDefault();
	console.log("tentative de soumission de rapport utilisateur.");
	var form= $('form#userReportForm');
	$.ajax('/userReport/create', {
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: form.serialize(),
		success: function(result){
			//$("#userReport").popover("toggle");
			console.log("HARDOGAY FOOOOOO!!!! "+result);
		},
		error: function(req, err, errMsg){
			console.log("Quelque chose à merdé..."+req+"/"+err+"/"+errMsg);
		}
		
	});
});
*/