/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* userReportDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function userReportDAL() {
		
    }

	/**
     * get userReport by id
     * @param  {Integer}   userReportId
     * @param  {Function} callback
     */
    userReportDAL.prototype.get = function(userReportId, callback) {
        dbContext.userReport.find(userReportId).success(function(userReport) {
            callback(userReport);
        });
    };

    /**
     * get all userReport
     * @param  {Function} callback
     */
    userReportDAL.prototype.getAll = function(callback) {
        dbContext.userReport.findAll({order: 'id DESC'}).success(function(userReports) {
            callback(userReports);
        });
    };

    /**
     * save userReport
     * @param  {Object}   userReport
     * @param  {Function} callback
     */
    userReportDAL.prototype.save = function(userReport, callback) {
        var userReport = dbContext.userReport.build(userReport);
        userReport.save().success(function(userReport) {
            callback(userReport);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a userReport
     * @param  {Object}   userReport
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    userReportDAL.prototype.update = function(userReport, attributes, callback){
        userReport.updateAttributes(attributes).success(function (updateduserReport) { 
            callback(updateduserReport);
        }); 
    };

    /**
     * delete an userReport
     * @param  {Integer}   userReportId
     * @param  {Function} callback
     */
    userReportDAL.prototype.remove = function(userReportId, callback) {   
        dbContext.userReport.find(userReportId).success(function(userReport) {
			userReport.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = userReportDAL;
})();