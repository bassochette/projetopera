

/**
* Module dependencies.
*/
var MuseumDAL = require('../dal/museumDAL');

/**
* museumController class
*/
(function () {

    /**
    * Attributes.
    */
    var museumDAL = new MuseumDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function MuseumController(app) {
        this.routes(app);
    }

    /**
    * museumController routes.
    * @param {app} - express app.
    */
    MuseumController.prototype.routes = function(app) {
        app.get('/museum', this.index);
        app.get('/museum/show/:id', this.show);
        app.get('/museum/new', this.new);
        app.post('/museum/create', this.create);
        app.get('/museum/edit/:id', this.edit);
        app.post('/museum/edit', this.update);
        app.get('/museum/delete/:id', this.delete);
        app.post('/museum/delete', this.destroy);
    };

    /**
    * [httpget]
    * MuseumController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    MuseumController.prototype.index = function(req, res) {
        museumDAL.getAll(function (museums) {
            res.render('museum/index', { 'museums': museums });
        });
    };

    /**
    * [httpget]
    * MuseumController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    MuseumController.prototype.show = function(req, res) {
        var museumId = req.params.id;
        museumDAL.get(museumId, function (museum) {
            res.render('museum/show', { 'museum': museum });
        });
    };

    /**
    * [httpget]
    * MuseumController edit action.
    * @param {req} http request.
    * @param {res} http response.
    */
    MuseumController.prototype.edit = function(req, res) {
        var museumId = req.params.id;
        museumDAL.get(museumId, function (museum) {
            res.render('museum/edit', { 'museum': museum });
        });
    };

    /**
    * [httppost]
    * MuseumController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    MuseumController.prototype.update = function(req, res) {
        var museum = req.body.museum;
        
        museumDAL.get(museum.id, function(entity){
            if(entity){
                museumDAL.update(entity, museum, function (museum) {
                    res.redirect('/museum');
                });
            }
            else{
                res.send(404);
            }
        });
    };    

    /**
    * [httpget]
    * museumController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    MuseumController.prototype.new = function(req, res) {
        res.render('museum/create');  
    };

    /**
    * [httppost]
    * museumController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    MuseumController.prototype.create = function(req, res) {
        var museum = req.body.museum;
        
        museumDAL.save(museum, function (data) {
            res.redirect('/museum');
        });
    };

    /**
    * [httpget]
    * MuseumController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    MuseumController.prototype.delete = function(req, res) {
        var museumId = req.params.id;
        museumDAL.get(museumId, function (museum) {
            res.render('museum/delete', { 'museum': museum });
        });
    };

    /**
    * [httppost]
    * MuseumController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    MuseumController.prototype.destroy = function(req, res) {
        var museum = req.body.museum;
        museumDAL.remove(museum.id, function (data) {
            res.redirect('/museum');
        });
    };

    module.exports = MuseumController;
})();