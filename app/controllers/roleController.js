

/**
* Module dependencies.
*/
var RoleDAL = require('../dal/roleDAL');

/**
* roleController class
*/
(function () {

    /**
    * Attributes.
    */
    var roleDAL = new RoleDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function RoleController(app) {
        this.routes(app);
    }

    /**
    * roleController routes.
    * @param {app} - express app.
    */
    RoleController.prototype.routes = function(app) {
        app.get('/role', this.index);
        app.get('/role/show/:id', this.show);
        app.get('/role/new', this.new);
        app.post('/role/create', this.create);
        app.get('/role/edit/:id', this.edit);
        app.post('/role/edit', this.update);
        app.get('/role/delete/:id', this.delete);
        app.post('/role/delete', this.destroy);
    };

    /**
    * [httpget]
    * RoleController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RoleController.prototype.index = function(req, res) {
        roleDAL.getAll(function (roles) {
            res.render('role/index', { 'roles': roles });
        });
    };

    /**
    * [httpget]
    * RoleController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RoleController.prototype.show = function(req, res) {
        var roleId = req.params.id;
        roleDAL.get(roleId, function (role) {
            res.render('role/show', { 'role': role });
        });
    };

    /**
    * [httpget]
    * RoleController edit action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RoleController.prototype.edit = function(req, res) {
        var roleId = req.params.id;
        roleDAL.get(roleId, function (role) {
            res.render('role/edit', { 'role': role });
        });
    };

    /**
    * [httppost]
    * RoleController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RoleController.prototype.update = function(req, res) {
        var role = req.body.role;
        
        roleDAL.get(role.id, function(entity){
            if(entity){
                roleDAL.update(entity, role, function (role) {
                    res.redirect('/role');
                });
            }
            else{
                res.send(404);
            }
        });
    };    

    /**
    * [httpget]
    * roleController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RoleController.prototype.new = function(req, res) {
        res.render('role/create');  
    };

    /**
    * [httppost]
    * roleController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RoleController.prototype.create = function(req, res) {
        var role = req.body.role;
        
        roleDAL.save(role, function (data) {
            res.redirect('/role');
        });
    };

    /**
    * [httpget]
    * RoleController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RoleController.prototype.delete = function(req, res) {
        var roleId = req.params.id;
        roleDAL.get(roleId, function (role) {
            res.render('role/delete', { 'role': role });
        });
    };

    /**
    * [httppost]
    * RoleController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RoleController.prototype.destroy = function(req, res) {
        var role = req.body.role;
        roleDAL.remove(role.id, function (data) {
            res.redirect('/role');
        });
    };

    module.exports = RoleController;
})();