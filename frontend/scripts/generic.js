var showFolderList = function(e, item){
	
	//var srcEle = $(e.srcElement);
	//srcEle.parent().last('td').prev().empty();
	console.log('un truc aurais du ce produire');
};

var hideFolderList = function(e){

};



var insertResults = function(results, title){
		
	
	var resultZone = $(".searchResultZone");

	
	$("#pageTitle").text(results.length+" "+title).hide().fadeIn();

	var tableBody = $("#resultTableBody");
	

	results.forEach(function(result, idx){
		

		idx === 0 ? console.log("result "+idx+": "+JSON.stringify(result.datation)) : null;
		
		var row = $("<tr onclick=\"location.href='/oeuvre/show/"+result.id+"'\"></tr>",{
			oeuvreId: result.id

		});
		
	
		row.addClass("darkenOnHover");
		if(result.verrou){
			row.append($("<td><span class='glyphicon glyphicon-lock'></span></td>"));
		} else {
			row.append($("<td class='yeh'></td>"));	
		}

		row.append($("<td >"+result.oeuvreId+"</td>"));
		row.append($("<td >"+result.designation+"</td>"));
		row.append($("<td >"+result.auteur+"</td>"));
		row.append($("<td >"+result.materiaux+"</td>"));
		row.append($("<td >"+result.techniques+"</td>"));
		row.append($("<td >"+result.datation+"</td>"));


		tableBody.append(row);
	});
	
	resultZone.fadeIn();
	$('#inventaire').fadeOut();
	$("#searchTable").fadeIn();

	//@dataTable

	$("table").dataTable({
	    searching: false,
	    ordering:  true,
	    order: [1, 'desc'],
	    paging: false,
	    columnDefs : [{searchable: false},{},{},{},{},{},{},{ visible: false}],
	    language: {
		    "sProcessing":     "Traitement en cours...",
		    "sSearch":         "Rechercher&nbsp;:",
		    "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
		    "sInfo":           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
		    "sInfoEmpty":      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
		    "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
		    "sInfoPostFix":    "",
		    "sLoadingRecords": "Chargement en cours...",
		    "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
		    "sEmptyTable":     "Aucune donnée disponible dans le tableau",
		    "oPaginate": {
		        "sFirst":      "Premier",
		        "sPrevious":   "Pr&eacute;c&eacute;dent",
		        "sNext":       "Suivant",
		        "sLast":       "Dernier"
		    },
		    "oAria": {
		        "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
		        "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
		    }
		}
	});

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

var uploadImage = function(event){
	event.preventDefault();
	//alert('hop');
}

// Extend the default picker options for all instances.
$.extend($.fn.pickadate.defaults, {
    monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    today: 'aujourd\'hui',
    clear: 'effacer',
    close: 'fermer',
    format: 'dd-mm-yyyy',
    formatSubmit: 'yyyy-mm-dd'
})



$(document).ready(function(){
	
	$('.datePicker').pickadate({
		selectMonths: true,
		selectYears: 200,
		max: true

	});

	

	$('#inventaireTabLink').click(function(e){
		e.preventDefault();
		$(this).tab('show');
		//alert('click');
	});
	$('#dossierOeuvreTabLink').click(function(e){
		e.preventDefault();
		$(this).tab('show');
		//alert(2);
	});

	//DAN anniv 17 septembre

	//$('#imagesUploadForm').on('submit', uploadImage;
	
	

	$("#submitSearch").on('click', function(){

		$.ajax({
			type: "POST",
			dataType: "json",
			timeout: 30000,
			data: {searchString: $("#searchString").val()},
			url: "/searchAPI/search",
			beforeSend: function(){
				$("#resultTableBody").empty();
				$("#searchResultZone").addClass("spinner spinnerGreen");
				$("#searchTable").hide().fadeOut();
				//alert("resultZone");
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


