

/**
* Module dependencies.
*/
var ChampsDAL = require('../dal/champsDAL');

/**
* champsController class
*/
(function () {

    /**
    * Attributes.
    */
    var champsDAL = new ChampsDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function ChampsController(app) {
        this.routes(app);
    }

    /**
    * champsController routes.
    * @param {app} - express app.
    */
    ChampsController.prototype.routes = function(app) {
        app.get('/champs', this.index);
        app.get('/champs/show/:id', this.show);
        app.get('/champs/new', this.new);
        app.post('/champs/create', this.create);
        app.get('/champs/edit/:id', this.edit);
        app.post('/champs/edit', this.update);
        app.get('/champs/delete/:id', this.delete);
        app.post('/champs/delete', this.destroy);
    };

    /**
    * [httpget]
    * ChampsController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ChampsController.prototype.index = function(req, res) {
        champsDAL.getAll(function (champss) {
            res.render('champs/index', { 'champss': champss });
        });
    };

    /**
    * [httpget]
    * ChampsController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ChampsController.prototype.show = function(req, res) {
        var champsId = req.params.id;
        champsDAL.get(champsId, function (champs) {
            res.render('champs/show', { 'champs': champs });
        });
    };

    /**
    * [httpget]
    * ChampsController edit action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ChampsController.prototype.edit = function(req, res) {
        var champsId = req.params.id;
        champsDAL.get(champsId, function (champs) {
            res.render('champs/edit', { 'champs': champs });
        });
    };

    /**
    * [httppost]
    * ChampsController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ChampsController.prototype.update = function(req, res) {
        var champs = req.body.champs;
        
        champsDAL.get(champs.id, function(entity){
            if(entity){
                champsDAL.update(entity, champs, function (champs) {
                    res.redirect('/champs');
                });
            }
            else{
                res.send(404);
            }
        });
    };    

    /**
    * [httpget]
    * champsController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ChampsController.prototype.new = function(req, res) {
        res.render('champs/create');  
    };

    /**
    * [httppost]
    * champsController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ChampsController.prototype.create = function(req, res) {
        var champs = req.body.champs;
        
        champsDAL.save(champs, function (data) {
            res.redirect('/champs');
        });
    };

    /**
    * [httpget]
    * ChampsController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ChampsController.prototype.delete = function(req, res) {
        var champsId = req.params.id;
        champsDAL.get(champsId, function (champs) {
            res.render('champs/delete', { 'champs': champs });
        });
    };

    /**
    * [httppost]
    * ChampsController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ChampsController.prototype.destroy = function(req, res) {
        var champs = req.body.champs;
        champsDAL.remove(champs.id, function (data) {
            res.redirect('/champs');
        });
    };

    module.exports = ChampsController;
})();