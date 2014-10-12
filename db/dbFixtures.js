/**
 * Using
 */
var DbContext = require(__dirname + '/dbContext');
var fs = require('fs');
var path = require('path');
//var Lazy = require('lazy');

var chargementFichier = function(fichier){

	var filePath = path.normalize(path.join(__dirname, '../data_seeds/'+fichier+'.txt'));
	var file = fs.readFileSync(filePath, 'utf8');
	var r = file.split("\n");
	return r;

};

var random = function(max){
	return Math.floor((Math.random() * max));
};


/**
 * Run fixture function
 */
module.exports = function(){

	var dbContext = new DbContext();

	console.log("... running fixtures ...");

	var nbLigne = 1000;
	var	baseId = "GEN";


	/*
	var auteurs = chargementFichier('auteur');
	var datation = chargementFichier('datation');
	var denominations = chargementFichier('denominations');
	var domaine = chargementFichier('domaine');
	var ecole = chargementFichier('ecole');
	var epoque = chargementFichier('epoque');
	var genese = chargementFichier('genese');
	var inscriptions = chargementFichier('inscriptions');
	var lieux = chargementFichier('lieux');
	var methodeDeCollecte = chargementFichier('methodeDeCollecte');
	var personnes = chargementFichier('personnes');
	var role = chargementFichier('role');
	var status = chargementFichier('status');
	var sujet = chargementFichier('sujet');
	var techniques = chargementFichier('techniques');
	*/

	var ds = {};
	ds.auteurs = chargementFichier('auteur');
	ds.datation = chargementFichier('datation');
	ds.denominations = chargementFichier('denominations');
	ds.domaine = chargementFichier('domaine');
	ds.ecole = chargementFichier('ecole');
	ds.epoque = chargementFichier('epoque');
	ds.genese = chargementFichier('genese');
	ds.inscriptions = chargementFichier('inscriptions');
	ds.lieux = chargementFichier('lieux');
	ds.methodeDeCollecte = chargementFichier('methodeDeCollecte');
	ds.personnes = chargementFichier('personnes');
	ds.role = chargementFichier('role');
	ds.status = chargementFichier('status');
	ds.sujet = chargementFichier('sujet');
	ds.techniques = chargementFichier('techniques');


	var genObs = function(nbWords){

		var keys = Object.keys(ds);
		var obs = "";
		var dsprim=  ds[keys[random(keys.length)]];
		var keysprim = Object.keys(dsprim);
		//console.log();

		for(var i = 0; i < nbWords; i++){
			
			obs = obs+" "+dsprim[keysprim[random(keysprim.length+i)-i]];

		}
		return obs;

	};



	
	for(var i = 0; i < nbLigne; i++){


		
		var oeuvre = {	
				oeuvreId: baseId+"-"+random(100)+"-"+random(100),
				modeAcquisition: ds.methodeDeCollecte[random(ds.methodeDeCollecte.length)],
				prix: random(1000000),
				designation: ds.denominations[random(ds.denominations.length)],
				marquesInscription: ds.inscriptions[random(ds.inscriptions.length)],
				materiaux: ds.techniques[random(ds.techniques.length)],
				techniques: ds.techniques[random(ds.techniques.length)],
				auteur: ds.auteurs[random(ds.auteurs.length)],
				datation: ds.datation[random(ds.datation.length)],
				provenance: ds.lieux[random(ds.lieux.length)],
				observations: genObs(200),
				verrou: false
		};


		
		dbContext.oeuvre.create(oeuvre).success(function(oeuvre){
			console.log(oeuvre.id +" objet créer");
		});
	
	}
	

	dbContext.user.create({
		username: 'test',
		password: '$2a$10$ip6P6K8EsxAWbvvolohxV.0qeM2tFa0pF8FToCqbCXqBxe7UCU8E.',
		email: 'test@test.test'
	}).success(function(){
		console.log("Utilisateur test créer.");
	});

	dbContext.user.create({
		username: 'admin',
		password: '$2a$10$ip6P6K8EsxAWbvvolohxV.0qeM2tFa0pF8FToCqbCXqBxe7UCU8E.',
		email: 'admin@test.test',
		isAdmin: '1'
	}).success(function(){
		console.log("Utilisateur admin créer.");
	});
	

}