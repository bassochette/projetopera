module.exports = function (db, DataTypes) {

	var dossierOeuvre = db.define('dossierOeuvre', {
		valeur: DataTypes.TEXT,
		type: DataTypes.ENUM('info', 'date', 'lien', 'description'),
		oeuvreId : DataTypes.INTEGER,
		champId : DataTypes.INTEGER
		
	});
	return dossierOeuvre;
}