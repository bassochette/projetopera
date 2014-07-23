module.exports = function (db, DataTypes) {

	var role = db.define('role', {

		roleId: DataTypes.INTEGER,
		nomRole: DataTypes.STRING(150),
		description: DataTypes.TEXT

	});
	return role;
}