/**
* imageController class
*/

var MembershipFilters = require('../../middleware/membershipFilters');
var ImagesDAL = require('../dal/imagesDAL');
(function(){

	var filters = new MembershipFilters();
	var imagesDAL  = new ImagesDAL();

	function ImageController(app){
		this.routes(app);	
	}

	ImageController.prototype.routes = function(app){

		app.post('/images/upload', filters.authorize, this.upload);
	}

	ImageController.prototype.upload = function(req, res){

		//console.log("[imagesAPI][upload]"+util.inspect(req.body));
        var image = req.files.imagesUpload; 
        image.oeuvreId = req.body.oeuvreId;

        // Faire un putain de test!
        imagesDAL.saveImage(image, function(img){
            if(img.message){
               console.log('[imagesAPI][svg]'+img.message); 
            }
            //res.writeHead(200, { contentType: "application/json"});
            res.redirect('/oeuvre/show/'+image.oeuvreId);
        });
	} 

	module.exports = ImageController;
})();