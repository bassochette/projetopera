module.exports = function (db, DataTypes) {

	var dossierOeuvre = db.define('dossierOeuvre', {
		valeur: DataTypes.TEXT,
		oeuvreId : { type: DataTypes.INTEGER, allowNull: false, unique: 'dossierOeuvreUnique'},
		champsId : { type: DataTypes.INTEGER, allowNull: false, unique: 'dossierOeuvreUnique'}
		
	});
	return dossierOeuvre;
}