module.exports = function (db, DataTypes) {

	var userReport = db.define('userReport', {
		
			
				uid: DataTypes.INTEGER,
			
				type: DataTypes.STRING,
			
				titre: DataTypes.STRING,
			
				message: DataTypes.TEXT,
			
		
	});
	return userReport;
}