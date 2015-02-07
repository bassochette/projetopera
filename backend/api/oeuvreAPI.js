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

        // route v0.1.0
        app.get("/api/oeuvre", this.liste);
        app.get("/api/oeuvre/liste", this.liste);
        app.get("/api/oeuvre/liste/:pageSize/:offset", this.listePaged);
        app.get("/api/oeuvre/recent", this.recentlyUpdated);
        app.get("/api/oeuvre/compte", this.compte);
        app.get("/api/oeuvre/detail/:oeuvreId", this.detail);

        app.post("/api/oeuvre", this.ajout);
        app.put("/api/oeuvre", this.update);
        app.delete("/api/oeuvre/:oeuvreId", this.delete);

    };

    //retourne les details d'une oeuvre
    OeuvreAPI.prototype.detail = function(req, res){
        oeuvreDAL.get(req.params.oeuvreId, function(data){
            res.send(data);
        });
    };

    // Ajoute une oeuvre
    OeuvreAPI.prototype.ajout = function(req, res){

        var oeuvre = req.body.oeuvre;

        oeuvreDAL.save(oeuvre, function(data){
            res.send(data);
        });

    };

    // Mise à jour d'une oeuvre
    OeuvreAPI.prototype.update = function(req, res){

        var oeuvre = req.body.oeuvre;
        console.log("[oeuvreAPI] update "+oeuvre+" \ntype "+ typeof oeuvre);

        var t = JSON.parse(oeuvre);
        console.log("[oeuvreAPI] parsed update "+JSON.stringify(t)+" \ntype "+typeof t);

        oeuvreDAL.update(oeuvre, function(data){
            res.send(data);
        });


    }

    // Suppression d'une oeuvre
    OeuvreAPI.prototype.delete = function(req, res){

        var oeuvreId = req.params.oeuvreId;
        console.log("[oeuvreAPI] params suppression "+JSON.stringify(req.params));
        console.log("[oeuvreAPI] body suppression "+JSON.stringify(req.body));
        console.log("[oeuvreAPI] suppression oeuvre "+oeuvreId);

        oeuvreDAL.remove(oeuvreId, function(err){
            if(err){
                res.send(err);
            } else {
                res.send({suppression : true});
            }
        });
    }

    // Retourne la liste complète des oeuvres
    OeuvreAPI.prototype.liste= function(req, res) {
        oeuvreDAL.getAll(function(data){
            res.send(data);
        }); 
    };

    // retourne une liste paginé et limité des oeuvres
    OeuvreAPI.prototype.listePaged = function(req, res){

        var offset = req.params.offset;
        var pageSize = req.params.pageSize;

        oeuvreDAL.pagedList(offset, pageSize, function(data){
            res.send(data);
        });
    };

    // retourne le compte des oeuvres
    OeuvreAPI.prototype.compte = function(req, res){
        oeuvreDAL.count(function(data){
            console.log("[oeuvreAPI] compte "+data);
            res.send({"compte":data});
        });
    };


    // retourne les 50 dernières oeuvres modifié
    OeuvreAPI.prototype.recentlyUpdated = function(req, res){
        oeuvreDAL.getRecentlyUpdated(function(data){
            res.send(data);
        });
    };



    // Pas de d'accès à la route
    OeuvreAPI.prototype.undef = function(){
        return {"message":"route en chantier."};
    };
    

    module.exports = OeuvreAPI;
})();