module.exports = function (db, DataTypes) {

	var dossierOeuvre = db.define('dossierOeuvre', {
		valeur: DataTypes.TEXT,
		type: DataTypes.ENUM('info', 'document', 'lien', 'description')
		
	});
	return dossierOeuvre;
}