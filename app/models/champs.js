module.exports = function (db, DataTypes) {

	var champs = db.define('champs', {
		nom: DataTypes.STRING,
		type: DataTypes.ENUM('info', 'document', 'lien', 'description')
	});
	return champs;
}