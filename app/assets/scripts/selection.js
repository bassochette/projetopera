var populateSelection = function(callback, loadingCallBack, errorCallback){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/selection",
		timeout: 3000,
		beforeSend : loadingCallBack,
		success : callback,
		error : errorCallback
	});
};

var dragToFolder = function(e, id){
	//e.preventDefault();

	e.dataTransfer.setData('oeuvreId', id);
	
};

var allowDrop = function(e){
	e.preventDefault();
	this.style.opacity= '0.4';
}

var dropToFolder = function(e, folder){
	e.preventDefault();
	var d= {};
	d.oeuvreId = e.dataTransfer.getData("oeuvreId");
	d.folderId = folder;

	//alert("sending: "+JSON.stringify(d));
	$.ajax({ 
		type: "POST",
		datatype: "json",
		url: "/selection/addItem",
		data: d,
		succes: function(status){
			alert('status: ');
		},
		error: function(err){
			alert("error: "+JSON.stringify(err.message));
		}
	});

};


$(document).ready(function(){
	populateSelection(function(data){
		
		var list = $("#listDossier");
		list.toggleClass('spinner');
		data.forEach(function(dossier){
			list.append("<li ondrop='dropToFolder(event, "+dossier.id+")' ondragover='allowDrop(event)'  id='dossier"+dossier.id+"'><a href='/selection/"+dossier.id+"'>"+dossier.nom+"</a></li>");
		});
	}, function(){
		$("#listDossier").addClass("spinner");
	}, function(){
		$("#listDossier").toggleClass("spinner");

	});

	$("#nouveauDossier").on('click', function(){
		//alert($("#folderName").val());
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "/selection/createFolder",
			data: {folderName: $("#folderName").val()},
			success: function(data){
				//alert("ok "+JSON.stringify(data));
				var list = $("#listDossier");
				list.append("<li ondrop='dropToFolder(event, "+data.id+")' ondragover='allowDrop(event)'  id='dossier"+data.id+"' ><a href='#'>"+data.nom+"</a></li>");
				
			}
		});
	});
});