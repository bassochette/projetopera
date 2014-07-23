/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* recolementDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function recolementDAL() {
		
    }

	/**
     * get recolement by id
     * @param  {Integer}   recolementId
     * @param  {Function} callback
     */
    recolementDAL.prototype.get = function(recolementId, callback) {
        dbContext.recolement.find(recolementId).success(function(recolement) {
            callback(recolement);
        });
    };

    /**
     * get all recolement
     * @param  {Function} callback
     */
    recolementDAL.prototype.getAll = function(callback) {
        dbContext.recolement.findAll({order: 'id DESC'}).success(function(recolements) {
            callback(recolements);
        });
    };

    /**
     * save recolement
     * @param  {Object}   recolement
     * @param  {Function} callback
     */
    recolementDAL.prototype.save = function(recolement, callback) {
        var recolement = dbContext.recolement.build(recolement);
        recolement.save().success(function(recolement) {
            callback(recolement);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a recolement
     * @param  {Object}   recolement
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    recolementDAL.prototype.update = function(recolement, attributes, callback){
        recolement.updateAttributes(attributes).success(function (updatedrecolement) { 
            callback(updatedrecolement);
        }); 
    };

    /**
     * delete an recolement
     * @param  {Integer}   recolementId
     * @param  {Function} callback
     */
    recolementDAL.prototype.remove = function(recolementId, callback) {   
        dbContext.recolement.find(recolementId).success(function(recolement) {
			recolement.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = recolementDAL;
})();