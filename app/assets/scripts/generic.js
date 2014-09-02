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
	tableBody.empty();

	results.forEach(function(result){
		
		//console.log("result: "+JSON.stringify(result));
		
		var row = $("<tr></tr>",{
			oeuvreId: result.id

		});
		
	
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
		row.append("<td onclick=\"location.href='/oeuvre/show/"+result.id+"'\">"+result.updatedAt+"</td>");
		row.append("<td onclick=\"location.href='/oeuvre/show/"+result.id+"'\">"+result.createdAt+"</td>");

		tableBody.append(row).fadeIn();
	});
	
	resultZone.fadeIn();
	$('#inventaire').fadeOut();
	$("#searchTable").fadeIn();

	//@dataTable
	/*
	$("table").dataTable({
	    searching: false,
	    ordering:  true,
	    language: {
	    	"emptyTable":     "Pas de données disponibles.",
    	    "info":           "Affichage _START_ to _END_ of _TOTAL_ entries",
    	    "infoEmpty":      "Affichage 0 sur 0 of 0 entries",
    	    "infoFiltered":   "(filtered from _MAX_ total entries)",
    	    "infoPostFix":    "",
    	    "thousands":      "",
    	    "decimal": 		 ",",
    	    "lengthMenu":     "Afficher _MENU_ résultat",
    	    "loadingRecords": "Chargement...",
    	    "processing":     "Traitement...",
    	    "search":         "Recherche:",
    	    "zeroRecords":    "Aucun résultat",
    	    "paginate": {
    	        "first":      "Premier",
    	        "last":       "Dernier",
    	        "next":       "Suivant",
    	        "previous":   "Précédent"
    	    },
    	    "aria": {
    	        "sortAscending":  ": activate to sort column ascending",
    	        "sortDescending": ": activate to sort column descending"
    	    }
    }
} );*/

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


