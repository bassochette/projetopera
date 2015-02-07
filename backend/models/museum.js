module.exports = function (db, DataTypes) {

	var museum = db.define('museum', {
		adresse: DataTypes.TEXT,
		description: DataTypes.TEXT,
		identifiantNational: DataTypes.STRING
	});
	return museum;
}