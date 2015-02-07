//dep
var DbContext = require('../../db/dbContext');

//class

(function(){

	//attributes
	var dbContext = new DbContext();
	var that = this;

	//const 
	function selectionDAL(){

	}



	selectionDAL.prototype.getUserFolders = function(userId, callback){

		dbContext.selectionFolder.findAll({where: {uid : userId}, order: [['createdAt','DESC']]} ).success(function(folders){
			//console.log("folders: "+JSON.stringify(folders));
			callback(folders);
		}).error(function(err){
			callback({message: err});
		});

	};

	selectionDAL.prototype.getFolderItems = function( folderId , callback){

		dbContext.selectionItem.findAll({where: {folderId : folderId}}).success(function(items){
			//console.log("item:s "+items);
			callback(items);
		}).error(function(err){
			callback({message: err});
		});

	};

	

	selectionDAL.prototype.saveFolder = function(folder, callback){

		
		dbContext.selectionFolder.findOrCreate(folder)
								.complete(function(err, folder){
									callback(folder);
								});
		
	};

	selectionDAL.prototype.saveItem = function(item, callback){
	
		dbContext.selectionItem.create(item)
								.complete(function(err, item){
									callback(item);
								});

	};
	module.exports = selectionDAL;
})();