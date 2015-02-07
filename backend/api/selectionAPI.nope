
//dependance

var SelectionDAL = require('../dal/selectionDAL');
var OeuvreDAL = require('../dal/oeuvreDAL');
var MembershipFilters = require('../../middleware/membershipFilters');


(function (){

	//attribute
	var selectionDAL = new SelectionDAL();
	var oeuvreDAL = new OeuvreDAL();
	var filters = new MembershipFilters();

	//contructor
	function SelectionAPI(app){
		this.routes(app);
	}

	SelectionAPI.prototype.routes = function(app){

		
		app.post('/selectionAPI', filters.authorize, this.selection);
		app.get('/selectionAPI/:id', filters.authorize, this.getItems);
		app.post('/selectionAPI/createFolder', filters.authorize, this.addFolder);
		//app.post('/selection/rmFolder', filters.authorize, this.rmFolder);
		app.post('/selectionAPI/addItem', filters.authorize, this.addItem);
		//app.post('/selection/rmItem', filters.authorize, this.rmItem);
	};

	
	SelectionAPI.prototype.selection = function(req, res){
		var uid = req.user.id;

		selectionDAL.getUserFolders(uid, function(folders){
			res.send(folders);
		});

	};

	SelectionAPI.prototype.getItems = function(req, res){
		var folderId = req.body.id;

		selectionDAL.getFolderItems(req.params.id, function(items){
			
			//console.log("items :"+JSON.stringify(items));
			var oeuvreIds = [];

			items.forEach(function(item){
				oeuvreIds.push(item.oeuvreId);
			});

			oeuvreDAL.getListOeuvre(oeuvreIds, function(oeuvres){
				var data = {};
				data.items = oeuvres;
				//data.name = 
				res.send(data.items);
			});
		});
	};

	SelectionAPI.prototype.addFolder = function(req, res){
		var folder = {};
		folder.nom = req.body.folderName;
		folder.uid = req.user.id;
		console.log("ajout dossier: "+folder.nom);
		selectionDAL.saveFolder(folder, function(folder){
			res.send(folder);
		});
	};
	SelectionAPI.prototype.addItem = function(req, res){
		var item ={};
		item.folderId= req.body.folderId;
		item.oeuvreId= req.body.oeuvreId;
		selectionDAL.saveItem(item, function(){
			res.send(200);
		});

	};

	SelectionAPI.prototype.rmFolder = function(req, res){

	};

	

	SelectionAPI.prototype.rmItem = function(req, res){

	};
	
	module.exports = SelectionAPI;
})();