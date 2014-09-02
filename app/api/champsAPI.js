/*****
	Module dependencies
*******/
var MembershipFilters = require('../../middleware/membershipFilters');
var ChampsDAL = require('../dal/champsDAL');


/****
	Champs API
****/
(function(){

	/******
		Attributes
	****/

	var filters = new MembershipFilters();
	var champsDAL = new ChampsDAL();

	function ChampsAPI(app){
		this.routes(app);
	}

	ChampsAPI.prototype.routes = function(app){
		app.get('/champsAPI/get/:id', filters.authorize, this.getChamp);
		app.get('/champsAPI/getAll', filters.authorize, this.getAll);
		app.post('/champsAPI/creer', filters.authorize, this.creer);

	};

	ChampsAPI.prototype.getChamp = function(req, res){

		champsDAL.get(req.params.id, function(data){
			if(data.message){
				console.log('[ChampsAPI][getChamp][error]'+JSON.stringify(data.message));
			}
			res.send(data);
		});
	};
	ChampsAPI.prototype.getAll = function(req, res){
		champsDAL.getAll(function(data){
			res.send(data);
		});
	};

	ChampsAPI.prototype.creer = function(req, res){

		var chmps = {};
		chmps.nom = req.body.nom;
		chmps.type = req.body.type;

		champsDAL.save(chmps, function(data){
			res.send(200, JSON.stringify(data));
		});
	};

	module.exports = ChampsAPI;
})();