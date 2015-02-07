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
        // app.get('/oeuvreAPI', filters.authorize,  this.oeuvres);  
        // app.get('/oeuvreAPI/recentlyUpdated', filters.authorize, this.recentlyUpdated);   
        //app.get('/oeuvreAPI',  this.oeuvres);
        //app.get('/oeuvreAPI/recentlyUpdated', this.recentlyUpdated);

        // route v0.1.0
        app.get("/api/oeuvre", this.undef);//TODO
        app.get("/api/oeuvre/liste", this.undef);//TODO
        app.get("/api/oeuvre/liste/:pageSize/:offset", this.undef);//TODO

        app.post("/api/oeuvre", this.undef);//TODO
        app.put("/api/oeuvre", this.undef);//TODO
        app.delete("/api/oeuvre", this.undef);//TODO

    };


    OeuvreAPI.prototype.oeuvres= function(req, res) {    

        oeuvreDAL.getAll(function(data){
            res.send(data);
        }); 
    }; 

    OeuvreAPI.prototype.recentlyUpdated = function(req, res){
        oeuvreDAL.getRecentlyUpdated(20, function(data){
            res.send(data);
        });
    }

    OeuvreAPI.prototype.undef = function(){
        return {"message":"unhandled route"};
    };
    

    module.exports = OeuvreAPI;
})();