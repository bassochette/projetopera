var showMenuFolderList = function(e){
	e.preventDefault();
	$('#menuFolderSelect').fadeIn();
};

$(document).ready(function(){

	var menuSelect = $('#menuFolderSelect');

	populateSelection(function(folders){
		folders.forEach(function(folder){
			menuSelect.append($('<option value="'+folder.id+'">'+folder.nom+'</option>'));
		});

//<input class="inputAdd" id="folderName" name="folderName" placeHolder="Nouveau dossier" hidden="true"/></li>');
	/*
	var nouveauDossier = $("<option disabled></option>",{
								id: "nvDossierOption"
							})
							.append($("<button>+</button>",{ 
								class: "btn btnAdd btn-sm btn-info",
								id: "nvDossierButton"
							}))
							.append($("<input></input>",{
								class: "inputAdd",
								id: "nvDossier",
								placeHolder: "Nouveau dossier",
								hidden: true
							})); */


	menuSelect.append(nouveauDossier);

	}, function(){
		//menuSelect.addClass("spinner");
	},function(){
		//menuSelect.toggleClass("spinner");
	});

	menuSelect.on('change', function(e){
		e.preventDefault();
		//alert(menuSelect.val()+", "+$("#inventaire").attr("oeuvre"));

		//enregistrer l'oeuvre dans le dossier select
		var d= {};
		d.oeuvreId = $("#inventaire").attr("oeuvre");
		d.folderId = menuSelect.val();

		$.ajax({
			type: "POST",
			datatype: "json",
			url: "/selectionAPI/addItem",
			data: d,
			success: function(){
				//$("#notif").addClass("alert-success").append("<p>Et hop dans l'dossier!</p>").fadeIn();
				notif("Oeuvre ajouter.", "success");
			},
			error: function(){
				//$("#notif").addClass("alert-warn").text("Erreur lors de l'ajout.").fadeIn();
				notif("Echec de l'operation.", "warn");
			}
		});

		menuSelect.fadeOut();
	})		
});

