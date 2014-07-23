

/**
* Module dependencies.
*/
var DossierOeuvreDAL = require('../dal/dossierOeuvreDAL');

/**
* dossierOeuvreController class
*/
(function () {

    /**
    * Attributes.
    */
    var dossierOeuvreDAL = new DossierOeuvreDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function DossierOeuvreController(app) {
        this.routes(app);
    }

    /**
    * dossierOeuvreController routes.
    * @param {app} - express app.
    */
    DossierOeuvreController.prototype.routes = function(app) {
        app.get('/dossierOeuvre', this.index);
        app.get('/dossierOeuvre/show/:id', this.show);
        app.get('/dossierOeuvre/new', this.new);
        app.post('/dossierOeuvre/create', this.create);
        app.get('/dossierOeuvre/edit/:id', this.edit);
        app.post('/dossierOeuvre/edit', this.update);
        app.get('/dossierOeuvre/delete/:id', this.delete);
        app.post('/dossierOeuvre/delete', this.destroy);
    };

    /**
    * [httpget]
    * DossierOeuvreController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    DossierOeuvreController.prototype.index = function(req, res) {
        dossierOeuvreDAL.getAll(function (dossierOeuvres) {
            res.render('dossierOeuvre/index', { 'dossierOeuvres': dossierOeuvres });
        });
    };

    /**
    * [httpget]
    * DossierOeuvreController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    DossierOeuvreController.prototype.show = function(req, res) {
        var dossierOeuvreId = req.params.id;
        dossierOeuvreDAL.get(dossierOeuvreId, function (dossierOeuvre) {
            res.render('dossierOeuvre/show', { 'dossierOeuvre': dossierOeuvre });
        });
    };

    /**
    * [httpget]
    * DossierOeuvreController edit action.
    * @param {req} http request.
    * @param {res} http response.
    */
    DossierOeuvreController.prototype.edit = function(req, res) {
        var dossierOeuvreId = req.params.id;
        dossierOeuvreDAL.get(dossierOeuvreId, function (dossierOeuvre) {
            res.render('dossierOeuvre/edit', { 'dossierOeuvre': dossierOeuvre });
        });
    };

    /**
    * [httppost]
    * DossierOeuvreController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    DossierOeuvreController.prototype.update = function(req, res) {
        var dossierOeuvre = req.body.dossierOeuvre;
        
        dossierOeuvreDAL.get(dossierOeuvre.id, function(entity){
            if(entity){
                dossierOeuvreDAL.update(entity, dossierOeuvre, function (dossierOeuvre) {
                    res.redirect('/dossierOeuvre');
                });
            }
            else{
                res.send(404);
            }
        });
    };    

    /**
    * [httpget]
    * dossierOeuvreController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    DossierOeuvreController.prototype.new = function(req, res) {
        res.render('dossierOeuvre/create');  
    };

    /**
    * [httppost]
    * dossierOeuvreController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    DossierOeuvreController.prototype.create = function(req, res) {
        var dossierOeuvre = req.body.dossierOeuvre;
        
        dossierOeuvreDAL.save(dossierOeuvre, function (data) {
            res.redirect('/dossierOeuvre');
        });
    };

    /**
    * [httpget]
    * DossierOeuvreController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    DossierOeuvreController.prototype.delete = function(req, res) {
        var dossierOeuvreId = req.params.id;
        dossierOeuvreDAL.get(dossierOeuvreId, function (dossierOeuvre) {
            res.render('dossierOeuvre/delete', { 'dossierOeuvre': dossierOeuvre });
        });
    };

    /**
    * [httppost]
    * DossierOeuvreController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    DossierOeuvreController.prototype.destroy = function(req, res) {
        var dossierOeuvre = req.body.dossierOeuvre;
        dossierOeuvreDAL.remove(dossierOeuvre.id, function (data) {
            res.redirect('/dossierOeuvre');
        });
    };

    module.exports = DossierOeuvreController;
})();