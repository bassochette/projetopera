module.exports = function (db, DataTypes) {

	var oeuvre = db.define('oeuvre', {
		
			
				oeuvreId: DataTypes.STRING,
			
				modeAcquisition: DataTypes.TEXT,
			
				nomDonnateur: DataTypes.STRING,
			
				dateAcquisition: DataTypes.STRING,
			
				avisScientifique: DataTypes.TEXT,
			
				prix: DataTypes.STRING,
			
				dateInscriptionInventaire: DataTypes.STRING,
			
				designation: DataTypes.STRING,
			
				marquesInscription: DataTypes.TEXT,
			
				materiaux: DataTypes.STRING,
			
				techniques: DataTypes.TEXT,
			
				mesures: DataTypes.TEXT,
			
				indicationEtat: DataTypes.TEXT,
			
				auteur: DataTypes.TEXT,
			
				datation: DataTypes.STRING,
			
				fonction: DataTypes.TEXT,
			
				provenance: DataTypes.STRING,
			
				observations: DataTypes.TEXT,

				verrou: DataTypes.BOOLEAN
			
		
	});
	return oeuvre;
}