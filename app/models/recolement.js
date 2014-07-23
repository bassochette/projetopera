module.exports = function (db, DataTypes) {

	var recolement = db.define('recolement', {
		date: DataTypes.DATE,
		info: DataTypes.TEXT
		
	});
	return recolement;
}