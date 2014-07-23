/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* logDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function logDAL() {
		
    }

	/**
     * get log by id
     * @param  {Integer}   logId
     * @param  {Function} callback
     */
    logDAL.prototype.get = function(logId, callback) {
        dbContext.log.find(logId).success(function(log) {
            callback(log);
        });
    };

    /**
     * get all log
     * @param  {Function} callback
     */
    logDAL.prototype.getAll = function(callback) {
        dbContext.log.findAll({order: 'id DESC'}).success(function(logs) {
            callback(logs);
        });
    };

    /**
     * save log
     * @param  {Object}   log
     * @param  {Function} callback
     */
    logDAL.prototype.save = function(log, callback) {
        var log = dbContext.log.build(log);
        log.save().success(function(log) {
            callback(log);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a log
     * @param  {Object}   log
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    logDAL.prototype.update = function(log, attributes, callback){
        log.updateAttributes(attributes).success(function (updatedlog) { 
            callback(updatedlog);
        }); 
    };

    /**
     * delete an log
     * @param  {Integer}   logId
     * @param  {Function} callback
     */
    logDAL.prototype.remove = function(logId, callback) {   
        dbContext.log.find(logId).success(function(log) {
			log.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = logDAL;
})();