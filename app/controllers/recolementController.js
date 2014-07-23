

/**
* Module dependencies.
*/
var RecolementDAL = require('../dal/recolementDAL');

/**
* recolementController class
*/
(function () {

    /**
    * Attributes.
    */
    var recolementDAL = new RecolementDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function RecolementController(app) {
        this.routes(app);
    }

    /**
    * recolementController routes.
    * @param {app} - express app.
    */
    RecolementController.prototype.routes = function(app) {
        app.get('/recolement', this.index);
        app.get('/recolement/show/:id', this.show);
        app.get('/recolement/new', this.new);
        app.post('/recolement/create', this.create);
        app.get('/recolement/edit/:id', this.edit);
        app.post('/recolement/edit', this.update);
        app.get('/recolement/delete/:id', this.delete);
        app.post('/recolement/delete', this.destroy);
    };

    /**
    * [httpget]
    * RecolementController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RecolementController.prototype.index = function(req, res) {
        recolementDAL.getAll(function (recolements) {
            res.render('recolement/index', { 'recolements': recolements });
        });
    };

    /**
    * [httpget]
    * RecolementController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RecolementController.prototype.show = function(req, res) {
        var recolementId = req.params.id;
        recolementDAL.get(recolementId, function (recolement) {
            res.render('recolement/show', { 'recolement': recolement });
        });
    };

    /**
    * [httpget]
    * RecolementController edit action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RecolementController.prototype.edit = function(req, res) {
        var recolementId = req.params.id;
        recolementDAL.get(recolementId, function (recolement) {
            res.render('recolement/edit', { 'recolement': recolement });
        });
    };

    /**
    * [httppost]
    * RecolementController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RecolementController.prototype.update = function(req, res) {
        var recolement = req.body.recolement;
        
        recolementDAL.get(recolement.id, function(entity){
            if(entity){
                recolementDAL.update(entity, recolement, function (recolement) {
                    res.redirect('/recolement');
                });
            }
            else{
                res.send(404);
            }
        });
    };    

    /**
    * [httpget]
    * recolementController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RecolementController.prototype.new = function(req, res) {
        res.render('recolement/create');  
    };

    /**
    * [httppost]
    * recolementController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RecolementController.prototype.create = function(req, res) {
        var recolement = req.body.recolement;
        
        recolementDAL.save(recolement, function (data) {
            res.redirect('/recolement');
        });
    };

    /**
    * [httpget]
    * RecolementController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RecolementController.prototype.delete = function(req, res) {
        var recolementId = req.params.id;
        recolementDAL.get(recolementId, function (recolement) {
            res.render('recolement/delete', { 'recolement': recolement });
        });
    };

    /**
    * [httppost]
    * RecolementController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    RecolementController.prototype.destroy = function(req, res) {
        var recolement = req.body.recolement;
        recolementDAL.remove(recolement.id, function (data) {
            res.redirect('/recolement');
        });
    };

    module.exports = RecolementController;
})();