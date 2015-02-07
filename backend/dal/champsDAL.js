/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* champsDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function champsDAL() {
		
    }

	/**
     * get champs by id
     * @param  {Integer}   champsId
     * @param  {Function} callback
     */
    champsDAL.prototype.get = function(champsId, next) {
        dbContext.champs.find(champsId).success(function(champs) {
            next(champs);
        }).error(function(err){
            next({message: err});
        });
    };

    champsDAL.prototype.getAll = function(next){
        console.log('[champsDAL][getAll] call');
        dbContext.champs.findAll().success(function(champs){
            console.log('[champsDAL][getAll] success');
            next(champs);
        }).error(function(err){
            next({message: err});
        });
    };

    /**
     * save champs
     * @param  {Object}   champs
     * @param  {Function} callback
     */
    champsDAL.prototype.save = function(champs, callback) {
        var champs = dbContext.champs.build(champs);
        //console.log("champsDAL: "+champs);
        champs.save().success(function(champs) {
            callback(champs);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a champs
     * @param  {Object}   champs
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    champsDAL.prototype.update = function(champs, attributes, callback){
        champs.updateAttributes(attributes).success(function (updatedchamps) { 
            callback(updatedchamps);
        }); 
    };

    /**
     * delete an champs
     * @param  {Integer}   champsId
     * @param  {Function} callback
     */
    champsDAL.prototype.remove = function(champsId, callback) {   
        dbContext.champs.find(champsId).success(function(champs) {
			champs.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = champsDAL;
})();