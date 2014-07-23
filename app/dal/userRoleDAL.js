/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* userRoleDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function userRoleDAL() {
		
    }

	/**
     * get userRole by id
     * @param  {Integer}   userRoleId
     * @param  {Function} callback
     */
    userRoleDAL.prototype.get = function(userRoleId, callback) {
        dbContext.userRole.find(userRoleId).success(function(userRole) {
            callback(userRole);
        });
    };

    /**
     * get all userRole
     * @param  {Function} callback
     */
    userRoleDAL.prototype.getAll = function(callback) {
        dbContext.userRole.findAll({order: 'id DESC'}).success(function(userRoles) {
            callback(userRoles);
        });
    };

    /**
     * save userRole
     * @param  {Object}   userRole
     * @param  {Function} callback
     */
    userRoleDAL.prototype.save = function(userRole, callback) {
        var userRole = dbContext.userRole.build(userRole);
        userRole.save().success(function(userRole) {
            callback(userRole);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a userRole
     * @param  {Object}   userRole
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    userRoleDAL.prototype.update = function(userRole, attributes, callback){
        userRole.updateAttributes(attributes).success(function (updateduserRole) { 
            callback(updateduserRole);
        }); 
    };

    /**
     * delete an userRole
     * @param  {Integer}   userRoleId
     * @param  {Function} callback
     */
    userRoleDAL.prototype.remove = function(userRoleId, callback) {   
        dbContext.userRole.find(userRoleId).success(function(userRole) {
			userRole.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = userRoleDAL;
})();