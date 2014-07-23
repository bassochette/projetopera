/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* roleDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function roleDAL() {
		
    }

	/**
     * get role by id
     * @param  {Integer}   roleId
     * @param  {Function} callback
     */
    roleDAL.prototype.get = function(roleId, callback) {
        dbContext.role.find(roleId).success(function(role) {
            callback(role);
        });
    };

    /**
     * get all role
     * @param  {Function} callback
     */
    roleDAL.prototype.getAll = function(callback) {
        dbContext.role.findAll({order: 'id DESC'}).success(function(roles) {
            callback(roles);
        });
    };

    /**
     * save role
     * @param  {Object}   role
     * @param  {Function} callback
     */
    roleDAL.prototype.save = function(role, callback) {
        var role = dbContext.role.build(role);
        role.save().success(function(role) {
            callback(role);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a role
     * @param  {Object}   role
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    roleDAL.prototype.update = function(role, attributes, callback){
        role.updateAttributes(attributes).success(function (updatedrole) { 
            callback(updatedrole);
        }); 
    };

    /**
     * delete an role
     * @param  {Integer}   roleId
     * @param  {Function} callback
     */
    roleDAL.prototype.remove = function(roleId, callback) {   
        dbContext.role.find(roleId).success(function(role) {
			role.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = roleDAL;
})();