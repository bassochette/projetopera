
//dependance

var SelectionDAL = require('../dal/selectionDAL');
var MembershipFilters = require('../../middleware/membershipFilters');

(function (){

	//attribute
	var selectionDAL = new SelectionDAL();
	var filters = new MembershipFilters();

	//contructor
	function SelectionAPI(app){
		this.routes(app);
	}

	SelectionAPI.prototype.routes = function(app){

		
		app.post('/selection', filters.authorize, this.selection);
		app.post('/selection/createFolder', filters.authorize, this.addFolder);
		app.post('/selection/rmFolder', filters.authorize, this.rmFolder);
		app.post('/selection/addItem', filters.authorize, this.addItem);
		app.post('/selection/rmItem', filters.authorize, this.rmItem);
	};

	
	SelectionAPI.prototype.selection = function(req, res){
		var uid = req.user.id;
		//console.log("uid :"+uid);
		selectionDAL.getUserFolders(uid , function(selection){
			//console.log("Selection recu par l'api depuis la dal: "+JSON.stringify(selection));
			res.send(selection);
		});

	};
	SelectionAPI.prototype.addFolder = function(req, res){
		var folder = {};
		folder.nom = req.body.folderName;
		folder.uid = req.user.id;
		
		//console.log(JSON.stringify(folder));
		//console.log(JSON.stringify(req, 0, 2));
		selectionDAL.saveFolder(folder, function(folder){
			//console.log("Folder "+folder.nom+" created.");
			res.send(folder);
		});
	};
	SelectionAPI.prototype.addItem = function(req, res){
		var item ={};
		item.folderId= req.body.folderId;
		item.oeuvreId= req.body.oeuvreId;
		//console.log("req.body: "+JSON.stringify(req.body));

		//console.log("ajout oeuvre: "+item.folderId+" dans dossier:"+folderId);
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