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

    oeuvreDAL.prototype.getRecent = function(n, callback){
        dbContext.oeuvre.findAll({order: 'updatedAt DESC', limit: n}).success(function(oeuvres){
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
        var oeuvre = dbContext.oeuvre.build(oeuvre);
        oeuvre.save().success(function(oeuvre) {
            callback(oeuvre);
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
			oeuvre.destroy().success(function(data) {
				callback(data);
			});
        })
    };

    
    oeuvreDAL.prototype.lock = function(oeuvreId, callback){
        dbContext.oeuvre.find(oeuvreId).success(function(oeuvre){
            //oeuvre.
            oeuvre.set("verrou", true);
            oeuvre.save();
            callback(oeuvre);
        });
    }
    
    module.exports = oeuvreDAL;
})();