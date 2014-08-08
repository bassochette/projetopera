module.exports = function(db, Datatype){

	var selectionFolder = db.define('selectionFolder', {
		nom: Datatype.STRING,
		description: Datatype.TEXT
	});
	return selectionFolder;
};