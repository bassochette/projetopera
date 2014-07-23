module.exports = function (db, DataTypes) {

	var dossierOeuvre = db.define('dossierOeuvre', {
		valeur: DataTypes.TEXT
		
	});
	return dossierOeuvre;
}