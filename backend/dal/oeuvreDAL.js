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

    oeuvreDAL.prototype.pagedList = function ( offset, pageSize, next){

        dbContext.oeuvre.findAll({ "limit": pageSize, "offset": offset}).success(function(data){
            next(data);
        });
    };

    oeuvreDAL.prototype.getListOeuvre = function(list, callback){
        dbContext.oeuvre.findAll({where: {id: {in: list}}})
                        .success(function(oeuvres){
                            callback(oeuvres);
                        });
    };

    oeuvreDAL.prototype.count = function(next){

        dbContext.oeuvre.count().success(function(data){
            next(data);
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
    oeuvreDAL.prototype.update = function(update, next){

        console.log("[oeuvreDAL] demande de mise à jour "+JSON.stringify(update)+" \n type "+typeof update);

        update = JSON.parse(update);

        dbContext.oeuvre.find(update.id).success(function(oeuvre){

            console.log("[oeuvreDAL] oeuvre à mettre à jour trouvé dans la base "+JSON.stringify(oeuvre));

            oeuvre.updateAttributes(update).success(function (updatedoeuvre) {
                next(updatedoeuvre);
            });

        });


    };

    /**
     * delete an oeuvre
     * @param  {Integer}   oeuvreId
     * @param  {Function} callback
     */
    oeuvreDAL.prototype.remove = function(oeuvreId, next) {

        dbContext.oeuvre.find(oeuvreId).success(function(oeuvre) {
			if(oeuvre){
                oeuvre.destroy().success(function() {
                    next();
                });
            } else {
                next({"message": "Oeuvre inexistante"});
            }

        }).error(function() {
                next({"message": "Oeuvre inexistante"});
            }
        );
    };

    
    oeuvreDAL.prototype.verrouillage = function(oeuvreId, callback){
        dbContext.oeuvre.find(oeuvreId).success(function(oeuvre){
            //oeuvre.
            oeuvre.set("verrou", true);
            oeuvre.set("dateInscriptionInventaire", new Date());
            oeuvre.save();
            callback(oeuvre);
        });
    }
    
    module.exports = oeuvreDAL;
})();