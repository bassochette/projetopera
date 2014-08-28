/**
* Module dependencies.
*/
var ImagesDAL = require('../dal/imagesDAL');
var MembershipFilters = require('../../middleware/membershipFilters');
//var Formidable = require('formidable'),
var  util = require('util');

/**
* oeuvreController class
*/
(function () {

    /**
    * Attributes.
    */
    var imagesDAL = new ImagesDAL();
    var filters = new MembershipFilters();
    /**
    * Constructor.
    * @param {app} - express app.
    */
    function ImagesAPI(app) {
        this.routes(app);
    }


    ImagesAPI.prototype.routes = function(app) {
        app.get('/imagesAPI/:id', filters.authorize,  this.getInfo); 
        app.get('/images/:oeuvreId/:digest', filters.authorize, this.image ); 
        app.get('/imagesAPI/getAll/:oeuvreId', filters.authorize, this.getInfoByOeuvre);
        app.post('/imagesAPI/upload', filters.authorize, this.upload);   
    };

    ImagesAPI.prototype.image = function(req, res){
        var oeuvreId = req.params.oeuvreId;
        var digest = req.params.digest;

        console.log("[iamgesAPI][image] requested "+oeuvreId+"/"+digest);

        imagesDAL.getBinaryByDigest(oeuvreId, digest, function(info, binary){
            res.writeHead(200, { mimeType: info.type});
            res.end(binary);
        });


    };

    ImagesAPI.prototype.getInfo= function(req, res){
        // get path from dal
        imagesDAL.getImageInfo(req.params.oeuvreId, function(image){
            //res.writeHead(200, { contentType: "application/json"});
            res.send(image);
            res.end();
        });

    }

    ImagesAPI.prototype.getInfoByOeuvre = function(req, res){
        imagesDAL.getAllImageInfoByOeuvre(req.params.oeuvreId, function(images){
            //res.writeHead(200, { contentType: "application/json"});
            res.send(images);
            //res.end();
        });
    };

    ImagesAPI.prototype.upload = function(req, res){

        //console.log("Une image messire!");
        console.log("[imagesAPI][upload]"+util.inspect(req.body));
        var image = req.files.imagesUpload; 
        image.oeuvreId = req.body.oeuvreId;

        imagesDAL.saveImage(image, function(img){
            if(img.message){
               console.log('[imagesAPI][svg]'+img.message); 
            }
            //res.writeHead(200, { contentType: "application/json"});
            res.end(img);
        });
        
    }

    module.exports = ImagesAPI;
})();