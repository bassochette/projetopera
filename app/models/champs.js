module.exports = function (db, DataTypes) {

	var champs = db.define('champs', {
		nom: DataTypes.STRING,
		type: DataTypes.ENUM('date', 'info', 'description', 'lien')
	});
	return champs;
}