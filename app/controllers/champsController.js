

/**
* Module dependencies.
*/
var ChampsDAL = require('../dal/champsDAL');
var MembershipFilters = require('../../middleware/membershipFilters');
/**
* champsController class
*/
(function () {

    /**
    * Attributes.
    */
    var champsDAL = new ChampsDAL();
    var filters = new MembershipFilters();

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
        app.get('/champs', filters.authorize, this.index);
        app.post('/champs/create', filters.authorize, this.create);
        //app.post('/champs/edit', filters.auhorize, this.update);
        //app.post('/champs/delete', this.destroy);
    };

    /**
    * [httpget]
    * ChampsController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ChampsController.prototype.index = function(req, res) {
        champsDAL.getAll(function (champss) {
            res.render('champs/index', { 'champs': champss });
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
    * [httppost]
    * ChampsController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    /*
    ChampsController.prototype.destroy = function(req, res) {
        var champs = req.body.champs;
        champsDAL.remove(champs.id, function (data) {
            res.redirect('/champs');
        });
    };
    */
    module.exports = ChampsController;
})();