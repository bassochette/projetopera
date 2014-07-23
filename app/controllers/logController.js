

/**
* Module dependencies.
*/
var LogDAL = require('../dal/logDAL');

/**
* logController class
*/
(function () {

    /**
    * Attributes.
    */
    var logDAL = new LogDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function LogController(app) {
        this.routes(app);
    }

    /**
    * logController routes.
    * @param {app} - express app.
    */
    LogController.prototype.routes = function(app) {
        app.get('/log', this.index);
        app.get('/log/show/:id', this.show);
        app.get('/log/new', this.new);
        app.post('/log/create', this.create);
        app.get('/log/edit/:id', this.edit);
        app.post('/log/edit', this.update);
        app.get('/log/delete/:id', this.delete);
        app.post('/log/delete', this.destroy);
    };

    /**
    * [httpget]
    * LogController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LogController.prototype.index = function(req, res) {
        logDAL.getAll(function (logs) {
            res.render('log/index', { 'logs': logs });
        });
    };

    /**
    * [httpget]
    * LogController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LogController.prototype.show = function(req, res) {
        var logId = req.params.id;
        logDAL.get(logId, function (log) {
            res.render('log/show', { 'log': log });
        });
    };

    /**
    * [httpget]
    * LogController edit action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LogController.prototype.edit = function(req, res) {
        var logId = req.params.id;
        logDAL.get(logId, function (log) {
            res.render('log/edit', { 'log': log });
        });
    };

    /**
    * [httppost]
    * LogController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LogController.prototype.update = function(req, res) {
        var log = req.body.log;
        
        logDAL.get(log.id, function(entity){
            if(entity){
                logDAL.update(entity, log, function (log) {
                    res.redirect('/log');
                });
            }
            else{
                res.send(404);
            }
        });
    };    

    /**
    * [httpget]
    * logController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LogController.prototype.new = function(req, res) {
        res.render('log/create');  
    };

    /**
    * [httppost]
    * logController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LogController.prototype.create = function(req, res) {
        var log = req.body.log;
        
        logDAL.save(log, function (data) {
            res.redirect('/log');
        });
    };

    /**
    * [httpget]
    * LogController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LogController.prototype.delete = function(req, res) {
        var logId = req.params.id;
        logDAL.get(logId, function (log) {
            res.render('log/delete', { 'log': log });
        });
    };

    /**
    * [httppost]
    * LogController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LogController.prototype.destroy = function(req, res) {
        var log = req.body.log;
        logDAL.remove(log.id, function (data) {
            res.redirect('/log');
        });
    };

    module.exports = LogController;
})();