/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* dossierOeuvreDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function dossierOeuvreDAL() {
		
    }

	/**
     * get dossierOeuvre by id
     * @param  {Integer}   dossierOeuvreId
     * @param  {Function} callback
     */
    dossierOeuvreDAL.prototype.get = function(dossierOeuvreId, callback) {
        dbContext.dossierOeuvre.find(dossierOeuvreId).success(function(dossierOeuvre) {
            callback(dossierOeuvre);
        });
    };

    /**
     * get all dossierOeuvre
     * @param  {Function} callback
     */
    dossierOeuvreDAL.prototype.getAll = function(callback) {
        dbContext.dossierOeuvre.findAll().success(function(dossierOeuvres) {
            callback(dossierOeuvres);
        });
    };

    /**
     * save dossierOeuvre
     * @param  {Object}   dossierOeuvre
     * @param  {Function} callback
     */
    dossierOeuvreDAL.prototype.save = function(dossierOeuvre, callback) {
        var dossierOeuvre = dbContext.dossierOeuvre.build(dossierOeuvre);
        dossierOeuvre.save().success(function(dossierOeuvre) {
            callback(dossierOeuvre);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a dossierOeuvre
     * @param  {Object}   dossierOeuvre
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    dossierOeuvreDAL.prototype.update = function(dossierOeuvre, attributes, callback){
        dossierOeuvre.updateAttributes(attributes).success(function (updateddossierOeuvre) { 
            callback(updateddossierOeuvre);
        }); 
    };

    /**
     * delete an dossierOeuvre
     * @param  {Integer}   dossierOeuvreId
     * @param  {Function} callback
     */
    dossierOeuvreDAL.prototype.remove = function(dossierOeuvreId, callback) {   
        dbContext.dossierOeuvre.find(dossierOeuvreId).success(function(dossierOeuvre) {
			dossierOeuvre.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = dossierOeuvreDAL;
})();