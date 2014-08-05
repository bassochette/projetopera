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
		dbContext.selectionFolder.findAll({where: {uid : userId}, order: [['createdAt','DESC']]} ).success(function(selectionFolders){
			//console.log("folders: "+selectionFolders);
			callback(selectionFolders);
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

	selectionDAL.prototype.getAllForUser = function(userId, callback){
		var that= this;
		that.getUserFolders(userId, function(folders){

			var done = 0;
			folders.forEach(function(folder){
				that.getFolderItems(folder.id ,function(items){
					folder.items = items;
					done++;
					if(folders.length == done){
						callback(folders);
					}
					
				});
			});
		});

	};

	selectionDAL.prototype.saveFolder = function(folder, callback){
		//console.log("folder at DAL: "+JSON.stringify(folder));

		
		dbContext.selectionFolder.create(folder)
								.complete(function(err, folder){
									callback(folder);
								});
		//console.log("folder converted t object "+ JSON.stringify(folderObject));
		
	};

	selectionDAL.prototype.saveItem = function(item, callback){
		var item = dbContext.selectionItem.build(item);
		item.save().success(function(item){
			callback(item);
		}).error(function(error){
			callback({message: error});
		});
	};
	module.exports = selectionDAL;
})();