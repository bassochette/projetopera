/**
* Module dependencies.
*/
var OeuvreDAL = require('../dal/oeuvreDAL');
var MembershipFilters = require('../../middleware/membershipFilters');

/**
* oeuvreController class
*/
(function () {

    /**
    * Attributes.
    */
    var oeuvreDAL = new OeuvreDAL();
    var filters = new MembershipFilters();
    /**
    * Constructor.
    * @param {app} - express app.
    */
    function OeuvreAPI(app) {
        this.routes(app);
    }


    OeuvreAPI.prototype.routes = function(app) {
        /*
        app.get('/oeuvreAPI', filters.authorize,  this.oeuvres);  
        app.get('/oeuvreAPI/recentlyUpdated', filters.authorize, this.recentlyUpdated); 
        */

        // GET 
        app.get('/oeuvreAPI', filters.authorize, this.getAll);
        app.get('/oeuvreAPI/recent', filters.authorize, this.getRecent);
        app.get('/oeuvreAPI/get/:id', filters.authorize, this.getOeuvre);

        // POST  
        app.post('/oeuvreAPI/oeuvre/create', filters.authorize, this.create);
        app.post('/oeuvreAPI/oeuvre/update', filters.authorize, this.update);
            // Super utilisateurs seulement
        app.post('/oeuvreAPI/oeuvre/lock', filters.admin, this.lock); 
        app.post('/oeuvreAPI/oeuvre/delete', filters.admin, this.delete);
    };
    /*
        POST methods
    */


    OeuvreAPI.prototype.create = function(req, res){

        var oeuvre = req.body.oeuvre;

        oeuvre.dateAcquisition = new Date(oeuvre.dateAcquisition);
        oeuvre.dateInscriptionInventaire = new Date(oeuvre.dateInscriptionInventaire);
         
        oeuvreDAL.save(oeuvre, function (data) {
            res.send(200, data);
        });

    };

    OeuvreAPI.prototype.update = function(req, res){

        var oeuvre = req.body.oeuvre;

        oeuvreDAL.get(oeuvre.id, function(data){
            if(data){
                oeuvreDAL.update(data, oeuvre, function(oeuvreUpdated){
                    res.send(oeuvreUpdated);
                });

            } else {
                res.send(404);
            }

        });
    };

    OeuvreAPI.prototype.lock = function(req, res){
        var oeuvreId = req.body.oeuvreId; 
        oeuvreDAL.lock(oeuvreId, function(data){
            res.send(200, data);
        });
    };

    OeuvreAPI.prototype.delete = function(req, res){
        oeuvreDAL.remove(req.body.oeuvreId, function(data){
            res.send(200, data);
        });
    };
    /*
        GET Methods
    */

    OeuvreAPI.prototype.getOeuvre = function(req, res){
        var oeuvreId = req.params.id;
        oeuvreDAL.get(oeuvreId, function(oeuvre){
            res.send(200, oeuvre);
        });

    };

    OeuvreAPI.prototype.getAll= function(req, res) {    

        oeuvreDAL.getAll(function(data){
            res.send(200, data);
        }); 
    }; 

    OeuvreAPI.prototype.getRecent = function(req, res){
        oeuvreDAL.getRecent(20, function(data){
            res.send(200, data);
        });
    }
    

    module.exports = OeuvreAPI;
})();