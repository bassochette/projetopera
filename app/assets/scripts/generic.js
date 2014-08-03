/*
function addUserReport(){

	//var form= $('#userReportForm');
	//console.log("meh : "+$('form').serialize());
	var data = {};
	data.uid= $('#userReport[uid]').val();
	data.titre= $('#userReport[titre]').val();
	data.type= $('#userReport[type]').val();
	data.message = $('#userReport[message]').val();

	console.log("objet data: "+JSON.stringify(data));
	alert(JSON.stringify(data));
	/*
	$.ajax('/userReport/create',{
		type: 'post',
		contentType: 'application/json',
		data: JSON.stringify(data),
		success: function(result){
			$("#userReport").popover("toggle");
			console.log("HARDOGAY FOOOOOO!!!! "+JSON.stringify(result));
		},
		error: function(req, err, errMsg){
			console.log("Quelque chose à merdé..."+req+"/"+err+"/"+errMsg);
		}
		
	});
	
}
*/
function popReport(){
		$("#userReport").popover({
			html: true,
			content: function(){
				return $("#popoverContentReport").html();
			}
		});
	
}







