/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* museumDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function museumDAL() {
		
    }

	/**
     * get museum by id
     * @param  {Integer}   museumId
     * @param  {Function} callback
     */
    museumDAL.prototype.get = function(museumId, callback) {
        dbContext.museum.find(museumId).success(function(museum) {
            callback(museum);
        });
    };

    /**
     * get all museum
     * @param  {Function} callback
     */
    museumDAL.prototype.getAll = function(callback) {
        dbContext.museum.findAll({order: 'id DESC'}).success(function(museums) {
            callback(museums);
        });
    };

    /**
     * save museum
     * @param  {Object}   museum
     * @param  {Function} callback
     */
    museumDAL.prototype.save = function(museum, callback) {
        var museum = dbContext.museum.build(museum);
        museum.save().success(function(museum) {
            callback(museum);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a museum
     * @param  {Object}   museum
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    museumDAL.prototype.update = function(museum, attributes, callback){
        museum.updateAttributes(attributes).success(function (updatedmuseum) { 
            callback(updatedmuseum);
        }); 
    };

    /**
     * delete an museum
     * @param  {Integer}   museumId
     * @param  {Function} callback
     */
    museumDAL.prototype.remove = function(museumId, callback) {   
        dbContext.museum.find(museumId).success(function(museum) {
			museum.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = museumDAL;
})();