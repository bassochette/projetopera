/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var util = require('util');

/**
* oeuvreDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();
    var sql = dbContext.db;
    var uploadDir = path.normalize('upload/images');
    /**
    * Constructor.
    */
    function imagesDAL() {
		
    }

    /**
    *   Serve image
    */
    imagesDAL.prototype.getBinaryByDigest = function(oid, digest, next){

        dbContext.image.find({where: sql.and({hash : digest, oeuvreId : oid})}).success(function(data){
            var path = data.path;
            var imageInfo = data;

            fs.readFile(path, function(err, data){
                //console.log(data);
                next(imageInfo, data);
            });
        })
    };

    imagesDAL.prototype.getImageInfoById = function(imageId, callback){
        dbContext.image.find({where: {id: imageId}})
                        .success(function(data){
                            callback(data);
                        });
    };


/*    imagesDAL.prototype.getImageInfoByDigest = function(digest, next){
        dbContext.image.find({where: {hash: digest}})
                        .success(function(data){
                            next(data);
                        });
    };
*/
    imagesDAL.prototype.getAllImageInfoByOeuvre = function(oeuvreId, callback){
        dbContext.image.findAll({where: {oeuvreid: oeuvreId}})
                        .success(function(data){
                            callback(data);
                        });
    };

    imagesDAL.prototype.getAllImagesInfo = function(uOffset, uLimit, next){


        dbContext.image.findAll({limit: uLimit, offset: uOffset})
        .success(function(data){
            next(data);
        });
    };

    
    /**
    *   Check unicity - private
    */
    var checkUnique = function(filePath, callback){

        var shasum = crypto.createHash('sha1');
        var hash = fs.ReadStream(filePath);
        hash.on('data', function(d){
            shasum.update(d);
        });

        hash.on('end', function(){
            var digest = shasum.digest('hex');

            //check in db
            dbContext.image.count({where: {hash: digest}}).success(function(count){
                console.log('count hash: '+count);
                if(count === 0){
                   callback(true, digest); 
               } else {
                    callback(false);
               }
                
            }).error(function(err){
                //console.log(util.inspect(err));
                callback(false, 0, {message: err});
            });
            
        })

       
    }

    /**
    * copy file to folder - private 
    */
    var copyToFolder = function(image, callback){
        fs.readFile(image.tmpPath, function(err, data){
            fs.writeFile(image.path, data, function(err){
                //console.log(util.inspect("err: "+err));
                if (err) {

                    //console.log('dossier manquant');
                    fs.mkdir(image.basePath+'/'+image.oeuvreId, function(err){
                        if(err){
                            callback({message: err});
                        }
                        copyToFolder(image, callback);
                    });
                    

                } else {
                    var img = dbContext.image.build(image);
                    img.save().success(function(image){
                        callback(image);
                    }).error(function(err){
                        callback({message: err});
                    });
                }
            });
        });
    }

    /***
    *    Orchestration de l'enregistrement
    */
    imagesDAL.prototype.saveImage = function(imageSrc, callback){

        //sale
        var uploadDir = path.normalize('upload/images');
        // var uploadDir = this.uploadDir;
        //var that = this;
        // créer un objet images avec les info sur le fichier
        //sauvegardé le fichier

        if(!imageSrc.oeuvreId){
            callback({message: {errno: 19001, code: 'OEUVREMANQUANTE'}});
        }
                
        var image = {};
        image.nom = imageSrc.name;
        image.type = imageSrc.type.substr((imageSrc.type.indexOf('/') + 1));
        image.oeuvreId = imageSrc.oeuvreId;
        image.tmpPath = imageSrc.path;
        image.basePath = uploadDir;
        
        checkUnique(image.tmpPath, function(check, digest, err){
            if(err){
                fs.unlink(image.tmpPath, function(errors){
                    callback([err, errors]);
                });
                
            } else if(check) {
                image.hash = digest;
                image.path = path.normalize(image.basePath+'/'+image.oeuvreId+'/'+digest);
               
                copyToFolder(image, function(returnImg){
                    fs.unlink(image.tmpPath, function(err){
                        if(err){
                            console.log(JSON.stringify(err));
                        }
                        callback(returnImg)
                    });
                });
            } else {
                fs.unlink(image.tmpPath, function(err){
                    callback({message : { errno: 19000, code: 'DOUBLONFICHIER'}});
                });
                
            }
        });

        
    };

    imagesDAL.prototype.delete = function(imageId, next){

        console.log('Starting deleting process for image with id '+imageId);
        this.getImageInfoById(imageId, function(data){

            var errors = false;
            console.log("Suppressing image with id "+data.id+" and digest "+data.hash);

            fs.unlink(data.path, function(err){
                if(err){
                    next({"message" : err});
                }
                dbContext.image.find(data.id).success(function(image) {
                    image.destroy().success(function() {
                        next();
                    });
                });
            });

        });
    };
	
    
    module.exports = imagesDAL;
})();