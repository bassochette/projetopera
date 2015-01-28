/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');


/**
* oeuvreDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

  
    /**
    * Constructor.
    */
    function oeuvreDAL() {
		
    }

	/**
     * get oeuvre by id
     * @param  {Integer}   oeuvreId
     * @param  {Function} callback
     */
    oeuvreDAL.prototype.get = function(oeuvreId, callback) {
        dbContext.oeuvre.find(oeuvreId).success(function(oeuvre) {
           
            callback(oeuvre);
        });
    };

    /**
     * get all oeuvre
     * @param  {Function} callback
     */
    oeuvreDAL.prototype.getAll = function(callback) {
        dbContext.oeuvre.findAll({order: 'id DESC'}).success(function(oeuvres) {
            callback(oeuvres);
        });
    };

    oeuvreDAL.prototype.getRecentlyUpdated = function(callback){
        dbContext.oeuvre.findAll({order: 'updatedAt DESC', limit: 50}).success(function(oeuvres){
            callback(oeuvres);
        }); 
    }

    oeuvreDAL.prototype.getParAuteur = function(callback) {
        dbContext.oeuvre.findAll({order: 'auteur ASC'}).success(function(oeuvres) {
            callback(oeuvres);
        });
    };
    oeuvreDAL.prototype.getParNom = function(callback) {
        dbContext.oeuvre.findAll({order: 'designation ASC'}).success(function(oeuvres) {
            callback(oeuvres);
        });
    };

    oeuvreDAL.prototype.getListOeuvre = function(list, callback){
        dbContext.oeuvre.findAll({where: {id: {in: list}}})
                        .success(function(oeuvres){
                            callback(oeuvres);
                        });
    };
    /**
     * save oeuvre
     * @param  {Object}   oeuvre
     * @param  {Function} callback
     */
    oeuvreDAL.prototype.save = function(oeuvre, callback) {
        console.log("Ajout d'une oeuvre "+JSON.stringify(oeuvre));
        
        var oeuvre = dbContext.oeuvre.build(oeuvre);
        // console.log("Oeuvre construite pour l''occasion "+JSON.stringify(oeuvre));
        oeuvre.save().success(function(oeuvre) {
            if(!oeuvre.oeuvreId){
                console.log("Aucun identifiant n'a été fournis attribution par défaut GEN-"+oeuvre.id);
                oeuvre.oeuvreId = "GEN-"+oeuvre.id;
                oeuvre.save().success(function(oeuvre){
                    callback(oeuvre);
                });
            }
            
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a oeuvre
     * @param  {Object}   oeuvre
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    oeuvreDAL.prototype.update = function(oeuvre, attributes, callback){
        oeuvre.updateAttributes(attributes).success(function (updatedoeuvre) { 
            callback(updatedoeuvre);
        }); 
    };

    /**
     * delete an oeuvre
     * @param  {Integer}   oeuvreId
     * @param  {Function} callback
     */
    oeuvreDAL.prototype.remove = function(oeuvreId, callback) {   
        dbContext.oeuvre.find(oeuvreId).success(function(oeuvre) {
			oeuvre.destroy().success(function() {
				callback();
			});
        })
    };

    
    oeuvreDAL.prototype.verrouillage = function(oeuvreId, callback){
        dbContext.oeuvre.find(oeuvreId).success(function(oeuvre){
            //oeuvre.
            oeuvre.set("verrou", true);
            oeuvre.set("dateInscriptionInventaire", new Date());
            oeuvre.save();
            callback(oeuvre.id);
        });
    }
    
    module.exports = oeuvreDAL;
})();