module.exports = function (db, DataTypes) {

	var Image = db.define('image', {
		height: DataTypes.INTEGER,
		width: DataTypes.INTEGER,
		dpiWidth : DataTypes.INTEGER,
		dpiHeight : DataTypes.INTEGER,
		type : DataTypes.STRING(5),
		hash : {type: DataTypes.STRING(255), unique: true, allowNull: false},
		nom : DataTypes.STRING,
		path : DataTypes.STRING,
		oeuvreId: DataTypes.INTEGER
	});
	return Image;
}