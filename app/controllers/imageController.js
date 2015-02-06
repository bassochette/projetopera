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
		app.get('/images/delete/:oeuvreId/:id', filters.authorize, this.delete);

		//VF
		app.post('/images/televersement', filters.authorize, this.upload);
		app.get('/images/suppression/:oeuvreId/:id', filters.authorize, this.delete);

		app.get('/images/galerie', filters.authorize, this.galery);
	}

	ImageController.prototype.galery = function(req, res){

		imagesDAL.getAllImagesInfo(0, 50, function(data){

			console.log("[imgCtlr] giving those info "+JSON.stringify(data));
			res.render('images/galery', {images : data} );
		});
		

	}

	ImageController.prototype.upload = function(req, res){

		//console.log("[imagesAPI][upload]"+util.inspect(req.body));
        var image = req.files.imagesUpload; 
        image.oeuvreId = req.body.oeuvreId;

        // Faire un test!
        imagesDAL.saveImage(image, function(img){
            if(img.message){
               console.log('[imagesAPI][svg]'+img.message); 
            }
            //res.writeHead(200, { contentType: "application/json"});
            res.redirect('/oeuvre/show/'+image.oeuvreId);
        });
	} 

	ImageController.prototype.delete = function(req, res){
		var imageId = req.params.id;
		var oeuvreId = req.params.oeuvreId;
		console.log('[imgCtlr] request for deleting image: '+imageId);

		imagesDAL.delete(imageId, function(){
			// console.log('Image supprimer avec succès '+JSON.stringify(img));
			res.redirect('/oeuvre/show/'+oeuvreId);
		});
	};

	module.exports = ImageController;
})();