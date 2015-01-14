/**
* Dossier oeuvre Front end 
*/

var isInit = false;
var init = function(oeuvreId){
	
	//console.log('[dossierOeuvre][initAjout]');
	var select = $('#ajoutChamps select');
	
	select.append($('<option disabled>Ajouter un champ</option>'));

	$.ajax({
		url: '/champsAPI/getAll',
		mehtod: 'GET',
		dataType: 'json',
		success: function(champs){
			//console.log(JSON.stringify(champs));

			champs.forEach(function(champ, idx){
				console.log(idx+' champ : '+JSON.stringify(champ));
				select.append($('<option value="'+champ.id+'">'+champ.nom+'  -  '+champ.type+'</option>',{
					champsId: champ.id
				}));

			});
				$.ajax({
		  		url: '/dossierOeuvreAPI/getByOeuvreId/'+oeuvreId,
		  		method: 'get',
		  		timeout: 15000,
		  		dataType: 'json',
		  		success: function(data){
		  			
		  			//console.log(JSON.stringify(data));
		  			isInit = true;
		  			workbench(data);
		  		},
		  		error: function(err){
		  			console.log('[dossierOeuvre][affichage][error]'+JSON.stringify(err));
		  			
		  			isInit = false;
		  		}
		  	});
			
		},
		error: function(err){
			console.log('[dossierOeuvre][initAjout]'+JSON.stringify(err));
			select.append($('<option disabled>Erreur chargement</option>',{
					value: champ.id
			}));
			isInit = false;
		}
	});

};

var champsElementFactory = function(){
	this.size = {small: '3', medium:'3', large: '10' };
};

champsElementFactory.prototype.control = function(){


	var control = $('<div></div>', {
		class: 'control'
	}).append($('<button></button>',{ 
		type: 'submit', 
		class:'formControlBtn'
		}).append($('<span></span>',{
			class: 'glyphicon glyphicon-ok'
		})));

	return control;
};

champsElementFactory.prototype.formalize = function(t, id){

	console.log("création element "+id+" dans le dossier.");
	console.log("plus d''info : "+JSON.stringify(t));
	var form =  $('<form></form>', {
		id: 'dossier'+id
	}).append($('<input></input>',{
			hidden: 'true',
			value: id,
			name: 'dossierOeuvreId'
	}));

	form.on('submit', function(e){
		e.preventDefault();

		var data = {};
		data.valeur = $(this).find('[name="valueContainer"]').val();
		if(!data.valeur){
			data.valeur = $(this).find('textarea').val();
			if(!data.valeur){
				data.valeur = "";
			}
		}
		data.dossierOeuvreId = $(this).find('[name="dossierOeuvreId"]').val();
		
		console.log("formalize "+JSON.stringify(data));
		
		$.ajax({
			url: '/dossierOeuvreAPI/post/majVal',
			method: 'post',
			dataType: 'json',
			data: data
		})
		.done(function(data){
			//alert(JSON.stringify(data));
			var strId = 'form#dossier'+data.id;
			$(strId).find('button.formControlBtn').removeClass('toSave');
			$(strId).find('span').removeClass('glyphicon-floppy-disk').addClass('glyphicon-ok');

		})
		.fail(function(err){
			console.log(JSON.stringify(err));
		});


	});

	return form;
}


champsElementFactory.prototype.info = function(id, nom, valeur){
	console.log('factory info');
	var info = $('<div></div>',{
		class: "col-sm-"+this.size.medium+" invItems"
	}).append($('<p>'+nom+':</p>',{
		class: 'invItemsDescriptor',
	})).append($('<input></input>',{
		id: nom+'-'+valeur,
		name: 'valueContainer',
		class: 'flatInput',
		value: valeur
	})).append(this.control);

	info.on('input', function(e){
		var control = $(this).parent().find('div.control');
		control.find('button.formControlBtn').addClass('toSave');
		control.find('span').removeClass('glyphicon-ok').addClass('glyphicon-floppy-disk');
	});

	return this.formalize('info', id).append(info);
};


champsElementFactory.prototype.description = function(id, nom, valeur){
	console.log('factory description ');
	var description = $('<div></div>',{
		class: 'col-sm-'+this.size.large+' invObs'
	}).append($('<p>'+nom+':</p>',{
		class: 'invDescriptor'
	})).append($('<textarea>'+valeur+'</textarea>',{
		id: nom+'-'+valeur,
		name: 'valueContainer',
		class: 'desc wysiwyg'
	})).append(this.control);

	description.on('input', function(e){
		var control = $(this).parent().find('div.control');
		control.find('button.formControlBtn').addClass('toSave');
		control.find('span').removeClass('glyphicon-ok').addClass('glyphicon-floppy-disk');
	});

	return this.formalize('description', id).append(description);
};

champsElementFactory.prototype.date = function(id, nom, valeur){
	console.log('factory date');
	var date = $('<div></div>',{
		class: 'col-sm-'+this.size.small+' invItems'
	}).append($('<p>'+nom+':</p>',{
		class: 'invMiscDescriptor'
	})).append($('<input></input>',{
		id: nom+'-'+valeur,
		value: valeur,
		name: 'valueContainer',
		class: 'datepicker'
	})).append(this.control);
/*
	date.on('input', function(e){
		var control = $(this).parent().find('div.control');
		control.find('button.formControlBtn').addClass('toSave');
		control.find('span').removeClass('glyphicon-ok').addClass('glyphicon-floppy-disk');
	});*/

	date.change(function(){
		var control = $(this).parent().find('div.control');
		control.find('button.formControlBtn').addClass('toSave');
		control.find('span').removeClass('glyphicon-ok').addClass('glyphicon-floppy-disk');
	});

	return this.formalize('date', id).append(date);
};

champsElementFactory.prototype.lien = function(id, nom, valeur){
	console.log('factory lien');
	return this.undefined(id, nom, valeur);
};

champsElementFactory.prototype.fichier = function(id, nom, valeur){
	console.log('factory fichier');
	return this.undefined(id, nom, valeur);
};

champsElementFactory.prototype.undefined= function(id, nom, valeur){
	
	console.log('factory undefined');
	
	var undefined = $('<div></div>',{
		class: 'col-sm-'+this.size.small+' invItems bad'
	}).append($('<p>'+nom+':</p>',{
		class: 'invItemsDescriptor'
	})).append($('<input></input>',{
		disabled: 'true',
		value: valeur,
		name: 'valueContainer'
	}));

	return undefined;
};

 

function appendToWb(el){
		//console.log('appendToWb '+el);
		$('#dossierOeuvre').prepend(el).fadeIn();
};

function routeToFactory(item, factory){
	
	console.log("routeToFactory "+JSON.stringify(item));

	if( item.type == 'info'){

		appendToWb(factory.info(item.id, item.nom, item.valeur));
		

	} else if( item.type == 'description') {

		appendToWb(factory.description(item.id, item.nom, item.valeur));
		

	} else if(item.type == 'lien') {

		appendToWb(factory.lien(item.id, item.nom, item.valeur));

	} else if( item.type == 'fichier'){
		// not implemented
		appendToWb(factory.fichier(item.id, item.nom, item.valeur));

	} else if( item.type == 'date') {
		// not implemented
		appendToWb(factory.date(item.id, item.nom, item.valeur));
		

	} else {

		appendToWb(factory.undefined(item.id, item.nom, item.valeur));
	}
	
}

//
var workbench = function(data){
	
	var elementFactory = new champsElementFactory();
	data.forEach(function(item){
		routeToFactory(item, elementFactory);
	});

	$('.datepicker').pickadate({
		format: 'dd-mm-yyyy',
		selectYears: 200,
		selectMonths: true,
		editable: true,
		max: 5

	});

};



var ajouterChamps = function(oeuvreId, champsId, valeur){
	var dossierOeuvre = {};
	dossierOeuvre.champsId = champsId;
	dossierOeuvre.valeur = valeur;
	dossierOeuvre.oeuvreId = oeuvreId;

	//alert(JSON.stringify(dossierOeuvre));
	//call 

	//faire une promise
	// *********************************
		// OLD CODE
	// $.ajax({
	// 	url: '/dossierOeuvreAPI/post/ajouter',
	// 	method: 'POST',
	// 	dataType: 'json',
	// 	data: dossierOeuvre,
	// 	success: function(data){
	// 		alert('dossier oeuvre ajouter '+JSON.stringify(data));

	// 		var f = new champsElementFactory();

	// 		routeToFactory(data, f);
	// 	},
	// 	error: function(err){
	// 		console.log('erreur création dossierOeuvre '+JSON.stringify(err));
	// 	}

	// });

	// ******************************************

	$.ajax({
		url: '/dossierOeuvreAPI/post/ajouter',
		method: 'POST',
		dataType: 'json',
		data: dossierOeuvre

	})
	.done(function(data){
			console.log('dossier oeuvre ajouter '+JSON.stringify(data));

			var f = new champsElementFactory();

			routeToFactory(data, f);
		})
	.fail(function(err){
			console.log('erreur création dossierOeuvre '+JSON.stringify(err));
			alert("Impossible d'ajouter ce champs, il est probablement déjà existent. Réessayez plus tard. Si le problème persiste envoyez un rapport à cette addresse: julien.prugne@gmail.com");
		});
 
};

var creerChamps = function(nom, type){

	console.log('creerChamps '+nom+' '+type);
	var chmps = {};
	chmps.nom = nom;
	chmps.type = type;

	console.log('création champs '+nom+' de type: '+type);
	$.ajax({
		url: '/champsAPI/creer',
		method: 'POST',
		dataType: 'json',
		data: chmps
	})
	.done(function(data){
			//alert('success '+data);
			console.log('Champs créer avec succès '+JSON.stringify(data));
			//var selectAjoutDossierOeuvre = $('#ajoutChamps select');

			var option = $('<option value="'+data.id+'" selected>'+data.nom+'  -  '+data.type+'</option>',{
				champsId: data.id,
				focus:'true'
			});

			$('#ajoutChamps select').fadeOut().find(':selected').removeAttr('selected').parent().append(option).show().fadeIn();
			$('#ajoutChamps input#ajoutChampsValeur').focus();

		})
	.fail(function(err){
			//alert('error '+err);
			console.log('Erreur lors de la création du champs : '+JSON.stringify(message));
			//console.log(JSON.stringify(err)));
		});

};


$('a#dossierOeuvreTabLink').on('shown.bs.tab', function (event) {
  //e.target // activated tab
  //e.relatedTarget // previous tab
  	if(!isInit){
  		//alert($('#inventaire').attr('oeuvre'));
  		init($('#inventaire').attr('oeuvre'));

  	};
  	
  	//prévoir un controle sur les valeurs

  	$('#ajoutChamps').on('submit', function(e){

  		e.preventDefault();
  		var oeuvreId = $('#inventaire').attr('oeuvre');
  		var champsId = $('#ajoutChampsSelect').find(':selected').attr('value');
  		var valeur = $('#ajoutChampsValeur').val();

  		$('#ajoutChampsValeur').val('');
  		
  		ajouterChamps(oeuvreId, champsId, valeur);

  		//window.location.href('/oeuvre/show/2/'+oeuvreId);
  		// vider le formulaire
  		// reloadWb();
  	});

  	$('#creerChamps').on('submit', function(e){

  		e.preventDefault();
  		//alert('Fooooo');
  		var formCreer = $('#creerChamps');
  		creerChamps($('#creerChampsNom').val(), $('#creerChampsType').val());
  		$('#creerChampsNom').val('');
  		$('#creerChampsType').val('');
  		//reloadAjout();

  	});


})