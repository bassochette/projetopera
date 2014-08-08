var showFolderList = function(e, item){
	
	//var srcEle = $(e.srcElement);
	//srcEle.parent().last('td').prev().empty();
	console.log('un truc aurais du ce produire');
};

var hideFolderList = function(e){

};



var insertResults = function(results, title){
		
	
	var resultZone = $(".searchResultZone");

	
	$("#pageTitle").text(title+" "+results.length).hide().fadeIn();

	var tableBody = $("#resultTableBody");
	tableBody.empty();

	results.forEach(function(result){
		
		//console.log("result: "+JSON.stringify(result));
		var row = $("<tr></tr>",{
			draggable: "true",
			ondragstart: "dragToFolder(event, "+result.id+")",
			oeuvreId: result.id

		});

		
		var folderSelect = $("<td></td>",{
			class: 'addToFolder',
			onclick: 'showFolderList(event, '+result.id+')'
		}).append($('<span></span>', {
			class: 'glyphicon glyphicon-folder-open'
		}));

		row.addClass("darkenOnHover");
		if(result.verrou){
			row.append("<td><span class='glyphicon glyphicon-lock'></span></td>");
		} else {
			row.append("<td></td>");	
		}

		row.append("<td onclick=\"location.href='/oeuvre/show/"+result.id+"'\">"+result.oeuvreId+"</td>");
		row.append("<td onclick=\"location.href='/oeuvre/show/"+result.id+"'\">"+result.designation+"</td>");
		row.append("<td onclick=\"location.href='/oeuvre/show/"+result.id+"'\">"+result.auteur+"</td>");
		row.append("<td onclick=\"location.href='/oeuvre/show/"+result.id+"'\">"+result.materiaux+"</td>");
		row.append("<td onclick=\"location.href='/oeuvre/show/"+result.id+"'\">"+result.techniques+"</td>");
		row.append("<td onclick=\"location.href='/oeuvre/show/"+result.id+"'\">"+result.datation+"</td>");
		//row.append("<td class='addToFolder' data-toggle='modal' data-target='.folderSelectModal' ><span class='glyphicon glyphicon-folder-open'></span></td>");
		row.append(folderSelect);

		tableBody.append(row).fadeIn();
	});
	resultZone.fadeIn();
	$('#inventaire').fadeOut();
	$("#searchTable").fadeIn();


};

var showInventaire = function(e){
	//e.preventDefault();

	$.ajax({
		type: "GET",
		url: "/oeuvreAPI",
		datatype: "JSON",
		success: function(oeuvres){
			console.log("oeuvres:"+oeuvres);
			insertResults(oeuvres, "Inventaire");
		}
	});
};
var rmNotif = function(e){
	e.srcElement.remove();
	alert("ok");
};

var notif = function(message, type){
	var notifCenter = $("#notif");

	notifCenter.empty();
	notifCenter.addClass("alert alert-"+type)
				.append($('<p>'+message+'</p>', {
					onclick: "rmNotif(event)"
				}))
				.alert();
}


$(document).ready(function(){

	

	$("#submitSearch").on('click', function(){

		$.ajax({
			type: "POST",
			dataType: "json",
			timeout: 10000,
			data: {searchString: $("#searchString").val()},
			url: "/searchAPI/search",
			beforeSend: function(){
				$("#searchTable").hide().fadeOut();
				$("#searchResultZone").addClass("spinner spinnerGreen");
			},
			success: function(results){
				$("#searchResultZone").toggleClass("spinner spinnerGreen");
				insertResults(results, 'résultat(s)');
			},
			error: function(err){
				$("#searchResultZone").toggleClass("spinner spinnerGreen");
				console.log("error: "+err.message);
			}
		});
	});
});


