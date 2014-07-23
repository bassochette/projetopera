

/**
* Module dependencies.
*/
var UserRoleDAL = require('../dal/userRoleDAL');

/**
* userRoleController class
*/
(function () {

    /**
    * Attributes.
    */
    var userRoleDAL = new UserRoleDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function UserRoleController(app) {
        this.routes(app);
    }

    /**
    * userRoleController routes.
    * @param {app} - express app.
    */
    UserRoleController.prototype.routes = function(app) {
        app.get('/userRole', this.index);
        app.get('/userRole/show/:id', this.show);
        app.get('/userRole/new', this.new);
        app.post('/userRole/create', this.create);
        app.get('/userRole/edit/:id', this.edit);
        app.post('/userRole/edit', this.update);
        app.get('/userRole/delete/:id', this.delete);
        app.post('/userRole/delete', this.destroy);
    };

    /**
    * [httpget]
    * UserRoleController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserRoleController.prototype.index = function(req, res) {
        userRoleDAL.getAll(function (userRoles) {
            res.render('userRole/index', { 'userRoles': userRoles });
        });
    };

    /**
    * [httpget]
    * UserRoleController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserRoleController.prototype.show = function(req, res) {
        var userRoleId = req.params.id;
        userRoleDAL.get(userRoleId, function (userRole) {
            res.render('userRole/show', { 'userRole': userRole });
        });
    };

    /**
    * [httpget]
    * UserRoleController edit action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserRoleController.prototype.edit = function(req, res) {
        var userRoleId = req.params.id;
        userRoleDAL.get(userRoleId, function (userRole) {
            res.render('userRole/edit', { 'userRole': userRole });
        });
    };

    /**
    * [httppost]
    * UserRoleController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserRoleController.prototype.update = function(req, res) {
        var userRole = req.body.userRole;
        
        userRoleDAL.get(userRole.id, function(entity){
            if(entity){
                userRoleDAL.update(entity, userRole, function (userRole) {
                    res.redirect('/userRole');
                });
            }
            else{
                res.send(404);
            }
        });
    };    

    /**
    * [httpget]
    * userRoleController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserRoleController.prototype.new = function(req, res) {
        res.render('userRole/create');  
    };

    /**
    * [httppost]
    * userRoleController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserRoleController.prototype.create = function(req, res) {
        var userRole = req.body.userRole;
        
        userRoleDAL.save(userRole, function (data) {
            res.redirect('/userRole');
        });
    };

    /**
    * [httpget]
    * UserRoleController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserRoleController.prototype.delete = function(req, res) {
        var userRoleId = req.params.id;
        userRoleDAL.get(userRoleId, function (userRole) {
            res.render('userRole/delete', { 'userRole': userRole });
        });
    };

    /**
    * [httppost]
    * UserRoleController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserRoleController.prototype.destroy = function(req, res) {
        var userRole = req.body.userRole;
        userRoleDAL.remove(userRole.id, function (data) {
            res.redirect('/userRole');
        });
    };

    module.exports = UserRoleController;
})();