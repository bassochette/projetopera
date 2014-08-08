module.exports = function(db, Datatype){

	var selectionItem = db.define('selectionItem', {
		oeuvreId : {type: Datatype.INTEGER, unique: 'oeuvreByFolderIndex'},
		folderId: {type: Datatype.INTEGER, unique: 'oeuvreByFolderIndex'}
	});
	return selectionItem;
}