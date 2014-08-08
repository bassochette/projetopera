
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
	function SelectionController(app){
		this.routes(app);
	}

	SelectionController.prototype.routes = function(app){

		app.get('/selection/:id', filters.authorize, this.index);
	};

	
	SelectionController.prototype.index = function(req, res){

		selectionDAL.getFolderItems(req.params.id, function(items){
			
			//console.log("items :"+JSON.stringify(items));
			var oeuvreIds = [];

			items.forEach(function(item){
				oeuvreIds.push(item.oeuvreId);
			});

			oeuvreDAL.getListOeuvre(oeuvreIds, function(oeuvres){
				res.render('oeuvre/index', {'oeuvres': oeuvres});
			});
		});
	};
	
	
	module.exports = SelectionController;
})();