module.exports = function (db, DataTypes) {

	var champs = db.define('champs', {
		nom: {type: DataTypes.STRING, unique: 'champsNomUnique', allowNull: false},
		type: DataTypes.ENUM('date', 'info', 'description', 'lien', 'fichier')
	});
	return champs;
}