var populateSelection = function(callback, loadingCallBack, errorCallback){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/selectionAPI",
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
	//e.preventDefault();
	//this.style.opacity= '0.4';
}

var dropToFolder = function(e, folder){
	e.preventDefault();
	var d= {};
	d.oeuvreId = e.dataTransfer.getData("oeuvreId");
	d.folderId = folder;

	console.log("new folder: "+JSON.stringify(d));
	$.ajax({ 
		type: "POST",
		datatype: "json",
		url: "/selectionAPI/addItem",
		data: d,
		success: function(status){
			console.log('status: ');
		},
		error: function(err){
			console.log("error: "+JSON.stringify(err.message));
		}
	});

};
var showSelection = function(e, folderId){
	e.preventDefault();
	//alert("fid: "+folderId);
	$.ajax({
		type: "GET",
		datatype: "json",
		url: "/selectionAPI/"+folderId,
		success: function(oeuvres){
			insertResults(oeuvres, '');
		}
	});

};

var ajouterDossier = function(){
	alert("j'aime les gnochis");
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/selectionAPI/createFolder",
		data: {folderName: $("#folderName").val()},
		success: function(dossier){
			alert("ok "+JSON.stringify(data));
			var list = $("#listDossier");
			list.append("<li ondrop='dropToFolder(event, "+dossier.id+")' ondragover='allowDrop(event)'  id='dossier"+dossier.id+"' class='liAdd' ><a href='#'>"+dossier.nom+"</a></li>");
			
		}
	});
}



$(document).ready(function(){

	
	populateSelection(function(data){
		
		var list = $("#listDossier");
		list.toggleClass('spinner');
		data.forEach(function(dossier){
			//console.log("dossier: "+JSON.stringify(dossier));
			//list.append("<li ondrop='dropToFolder(event, "+dossier.id+")' ondragover='allowDrop(event)' id='dossier"+dossier.id+"'><a href='/selection/"+dossier.id+"'>"+dossier.nom+"</a></li>");
			list.append("<li ondrop='dropToFolder(event, "+dossier.id+")' ondragover='allowDrop(event)' id='dossier"+dossier.id+"' onclick='showSelection(event, "+dossier.id+")' class='selectionFolder'><a >"+dossier.nom+"</a></li>");
			
		});
		//list.append('<li id="zouizoui"><input class="inputAdd" id="folderName" name="folderName" placeHolder="Nouveau dossier" hidden="true"/>
			//<button class="btn btnAdd btn-info"  id="nouveauDossier">+</button></li>');
		
		list.append($('<li></li>', {
			id: "zouizoui"
		}).append($('<input></input>', {
			class: "inputAdd",
			id: "folderName",
			name: "folderName",
			placeHolder: "Nouveau dossier",
			hidden: "true"
		}))
		.append($('<button></button>',{
			class: "btn btnAdd btn-info",
			id: "ajouterDossier",
			onclick: "ajouterDossier()"
		}).append($('<span></span>',{
			class: "glyphicon glyphicon-plus"
		}))));

		$("#zouizoui").hover(function(){
			$("#folderName").fadeIn(400);
		},function(){
			$("#folderName").fadeOut(400);
		});

	}, function(){
		$("#listDossier").addClass("spinner");
	}, function(){
		$("#listDossier").toggleClass("spinner");

	});
	
	$("#addToFolder").on('click', function(){

	})


});